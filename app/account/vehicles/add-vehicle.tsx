import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { InputError } from "@/components/input-error";
import { arrowLeft, profileUpload } from "@/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

import * as yup from "yup";

import * as ImagePicker from "expo-image-picker";

const schema = yup.object().shape({
  phone_number: yup.string().trim().required("Phoone number is required"),
  gender: yup.string().trim().required("Kindly select a gender"),
  country_id: yup.string().trim().required("Kindly select a country"),
  state: yup.string().trim().required("Kindly select a state"),
  city: yup.string().trim().required("Kindly select a city"),
});

export default function AddVehicle() {
  const app = useSelector((state: any) => state.app);
  const [vehicle, setVehicle] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // user can crop square
      aspect: [1, 1], // forces 1:1 profile photo shape
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
          width: "100%",
          paddingVertical: 30,
          paddingHorizontal: 15,
          zIndex: 1000,
        }}
      >
        <Pressable
          onPress={() => router.push("/account/vehicles/select-service")}
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            CONTINUE
          </Text>
        </Pressable>
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 150,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              // borderWidth: 1,
            }}
          >
            <Pressable
              onPress={() => router.back()}
              hitSlop={40}
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft()} width={21} height={16} />
            </Pressable>
            <Text
              style={{
                fontFamily: "HostGroteskBold",
                fontSize: 24,
              }}
            >
              Manage Vehicle
            </Text>
            <Pressable
              style={{
                width: 70,
                borderRadius: 100,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Pressable>
          </View>
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                marginBottom: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              {[1, 2, 3].map((item, key) => (
                <View
                  key={key}
                  style={{
                    height: 7,
                    width: !key ? 150 : 33,
                    borderRadius: 12,
                    backgroundColor: !key ? "#FBAF41" : "#D9D9D9",
                  }}
                ></View>
              ))}
            </View>
            <View>
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Text>
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 18,
                    }}
                  >
                    Select your ride
                  </Text>
                  <Text
                    style={{
                      fontFamily: "HostGroteskBold",
                      fontSize: 18,
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    (7 Vehicles available)
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGroteskBold",
                    fontSize: 12,
                    color: "#686868",
                    marginTop: 4,
                  }}
                >
                  Pick up passengers and complete ride bookings.
                </Text>
              </View>
              <ScrollView
                style={{
                  marginTop: 20,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                {[
                  require("@/assets/images/vehicles/motorcycle.png"),
                  require("@/assets/images/vehicles/mini.png"),
                  require("@/assets/images/vehicles/economy.png"),
                  require("@/assets/images/vehicles/comfort.png"),
                  require("@/assets/images/vehicles/suv.png"),
                  require("@/assets/images/vehicles/box-truck.png"),
                  require("@/assets/images/vehicles/pickup-truck.png"),
                ].map((item, key) => (
                  <Pressable
                    onPress={() => setVehicle(key)}
                    key={key}
                    style={{
                      backgroundColor: "#fff",
                      padding: 10,
                      borderRadius: 15,
                      marginRight: 10,
                      borderWidth: 1.5,
                      borderColor: key === vehicle ? "#FBAF41" : "#ffffff",
                    }}
                  >
                    <Image
                      source={item}
                      style={{
                        width: 150,
                        height: 110,
                        borderRadius: 14,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "HostGrotesk",
                        marginTop: 15,
                      }}
                    >
                      Motorcycle
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
          <View
            style={{
              flex: 1,
              height: "100%",
              marginTop: 50,
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "HostGroteskBold",
                  width: "100%",
                  marginBottom: 5,
                }}
              >
                Add Vehicle Details
              </Text>
              <Text
                style={{
                  fontFamily: "HostGrotesk",
                  fontSize: 12,
                  color: "#686868",
                  textAlign: "left",
                }}
              >
                Enter more details about your vehicle
              </Text>
              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                  }}
                >
                  <View style={[styles.container, { flex: 1 }]}>
                    <TextInput
                      style={[styles.input]}
                      placeholderTextColor={"#A09F9F"}
                      selectionColor={"#808080"}
                      placeholder="Enter Brand"
                      keyboardType="ascii-capable"
                      autoCapitalize="none"
                      autoCorrect={false}
                      readOnly={true}
                      textContentType="name"
                      value={""}
                    />
                  </View>
                  <View style={[styles.container, { flex: 1 }]}>
                    <TextInput
                      style={[styles.input]}
                      placeholderTextColor={"#A09F9F"}
                      selectionColor={"#808080"}
                      placeholder="Model"
                      keyboardType="ascii-capable"
                      autoCapitalize="none"
                      autoCorrect={false}
                      readOnly={true}
                      textContentType="name"
                      value={""}
                    />
                  </View>
                </View>
                <View style={styles.container}>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DropdownComponent
                        label="Select Year"
                        value={value}
                        onChange={onChange}
                        search={false}
                        data={[
                          { label: "Male", value: "male" },
                          { label: "Female", value: "female" },
                        ]}
                      />
                    )}
                  />
                  {errors.gender && (
                    <InputError message={errors.gender.message} />
                  )}
                </View>
                <View style={styles.container}>
                  <Controller
                    control={control}
                    name="phone_number"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors.phone_number && styles.errorInput,
                        ]}
                        placeholderTextColor={"#A09F9F"}
                        selectionColor={"#808080"}
                        placeholder="Enter Vehicle Plate Number"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="telephoneNumber"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.phone_number && (
                    <InputError message={errors.phone_number.message} />
                  )}
                </View>
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={"#A09F9F"}
                    selectionColor={"#808080"}
                    readOnly={true}
                    placeholder="Vehicle Color"
                    value={""}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    marginBottom: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 20,
                      backgroundColor: "#EDEDED",
                      borderStyle: "dashed",
                      borderWidth: 2,
                      borderColor: "#E7E7E6",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "HostGrotesk",
                      }}
                    >
                      Upload Photo
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      backgroundColor: "#FBAF41",
                      height: 45,
                      width: 45,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={pickImage}
                  >
                    <SvgXml xml={profileUpload()} width={22} height={22} />
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/account/image 37.png")}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                      }}
                    />
                    <Image
                      source={require("@/assets/images/account/image 37.png")}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                      }}
                    />
                    <Image
                      source={require("@/assets/images/account/image 37.png")}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "HostGroteskBold",
                      color: "#6A6A6A",
                    }}
                  >
                    +1More
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "HostGroteskBold",
                    width: "100%",
                    marginBottom: 5,
                  }}
                >
                  Vehicle Description
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGrotesk",
                    fontSize: 12,
                    color: "#686868",
                    textAlign: "left",
                  }}
                >
                  Enter specific and unique features of your vehicle.
                </Text>
              </View>
              <View
                style={[
                  {
                    paddingVertical: 20,
                    paddingTop: 10,
                    borderWidth: 1,
                    borderColor: "#E3E3E3",
                    borderRadius: 15,
                    paddingHorizontal: 13,
                    width: "100%",
                    backgroundColor: "#EDEDED",
                  },
                  { marginTop: 20, height: 200 },
                ]}
              >
                <TextInput
                  style={{
                    fontFamily: "HostGrotesk",
                    width: "100%",
                    backgroundColor: "#EDEDED",
                    fontSize: 16,
                    color: "#000000",
                  }}
                  placeholderTextColor={"#A09F9F"}
                  selectionColor={"#808080"}
                  placeholder="What makes your vehicle cool?"
                  value={""}
                  numberOfLines={10}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const DropdownComponent = ({ label, value, onChange, data, search }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Dropdown
      style={[styles.input]}
      placeholderStyle={{ color: "#A09F9F" }}
      selectedTextStyle={{
        color: "#000",
      }}
      containerStyle={{
        marginTop: 6,
        borderRadius: 15,
        backgroundColor: "#F5F5F5",
      }}
      itemContainerStyle={{
        backgroundColor: "#F5F5F5",
        fontFamily: "HostGrotesk",
        borderRadius: 15,
      }}
      inputSearchStyle={{
        borderRadius: 10,
      }}
      iconStyle={{}}
      data={data}
      search={search ?? true}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={label}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        onChange(item.value);
        setIsFocus(false);
      }}
      renderLeftIcon={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "HostGrotesk",
    marginBottom: 6,
  },
  input: {
    fontFamily: "HostGrotesk",
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 15,
    paddingHorizontal: 13,
    width: "100%",
    backgroundColor: "#EDEDED",
    fontSize: 16,
    color: "#000000",
  },
  errorInput: {
    borderColor: "red",
  },
});
