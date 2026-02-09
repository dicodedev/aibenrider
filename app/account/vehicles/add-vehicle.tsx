import {
  FlatList,
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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { appService } from "@/api/appService";
import * as ImagePicker from "expo-image-picker";

import { Upload } from "@/components/account/upload";
import { DropdownComponent } from "@/components/custom-dropdown";
import { CustomModal } from "@/components/custom-modal";
import { appSlice } from "@/store/appSlice";
import { Skeleton } from "moti/skeleton";

const schema = yup.object().shape({
  brand: yup.string().trim().required("Brand is required"),
  model: yup.string().trim().required("Model is required"),
  price: yup.number().required("Price is required"),
  color: yup.string().trim().required("Color is required"),
  plate_number: yup.string().trim().required("Plate number is required"),
  year: yup.string().trim().required("Year is required"),
  description: yup.string().trim().nullable(),
});

const currentYear = new Date().getFullYear();

const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
  const year = 2000 + i;
  return {
    label: year.toString(),
    value: year.toString(),
  };
});

export default function AddVehicle() {
  const app = useSelector((state: any) => state.app);
  const [vehicle, setVehicle] = useState(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState(null);

  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1], // forces 1:1 profile photo shape
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);

      // console.log("images", images);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    dispatch(
      appSlice.actions.setVehiclePayload({
        ...data,
        category_id: vehicle,
        images: images.map((item) => item.id),
      }),
    );

    router.push("/account/vehicles/select-service");
  };

  const fetchCategories = async () => {
    const res = await appService.getCategories();

    setCategories(res.data);
  };

  useEffect(() => {
    !visible && setTargetItem(null);
  }, [visible]);

  useEffect(() => {
    setVisible(targetItem ? true : false);
  }, [targetItem]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CustomModal
        setVisible={setVisible}
        visible={visible}
        content={
          success ? (
            <SuccessModal setVisible={setVisible} setDone={setSuccess} />
          ) : (
            <DeleteModal
              data={targetItem}
              setImages={setImages}
              setVisible={setVisible}
            />
          )
        }
      />

      {vehicle && (
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
            onPress={handleSubmit(onSubmit)}
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
      )}

      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 10,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              paddingLeft: 15,
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
                  paddingHorizontal: 15,
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
                    ({categories ? categories.length : ""} Categories available)
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
                  paddingLeft: 15,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                {categories
                  ? categories.map((item, key) => (
                      <Pressable
                        onPress={() => setVehicle(item.id)}
                        key={key}
                        style={{
                          backgroundColor: "#fff",
                          padding: 10,
                          borderRadius: 15,
                          marginRight: 10,
                          borderWidth: 1.5,
                          borderColor:
                            item.id === vehicle ? "#FBAF41" : "#ffffff",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
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
                          {item.name}
                        </Text>
                      </Pressable>
                    ))
                  : Array(4)
                      .fill(0)
                      .map((item, key) => (
                        <Pressable
                          key={key}
                          style={{
                            backgroundColor: "#fff",
                            padding: 10,
                            borderRadius: 15,
                            marginRight: 10,
                            borderWidth: 1.5,
                            borderColor: "#ffffff",
                          }}
                        >
                          <Skeleton
                            colorMode="light"
                            height={110}
                            width={150}
                            radius={14}
                          />
                          <View
                            style={{
                              marginTop: 8,
                            }}
                          >
                            <Skeleton
                              colorMode="light"
                              height={15}
                              width={120}
                              radius={10}
                            />
                          </View>
                        </Pressable>
                      ))}
              </ScrollView>
            </View>
          </ScrollView>
          {vehicle && (
            <View
              style={{
                flex: 1,
                marginTop: 50,
                paddingHorizontal: 15,
                paddingBottom: 120,
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
                      <Controller
                        control={control}
                        name="brand"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            style={[
                              styles.input,
                              errors.brand && styles.errorInput,
                            ]}
                            placeholderTextColor={"#A09F9F"}
                            selectionColor={"#808080"}
                            placeholder="Brand"
                            keyboardType="ascii-capable"
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="name"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />
                      {errors.brand && (
                        <InputError message={errors.brand.message} />
                      )}
                    </View>
                    <View style={[styles.container, { flex: 1 }]}>
                      <Controller
                        control={control}
                        name="model"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            style={[
                              styles.input,
                              errors.model && styles.errorInput,
                            ]}
                            placeholderTextColor={"#A09F9F"}
                            selectionColor={"#808080"}
                            placeholder="Model"
                            keyboardType="ascii-capable"
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="name"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />
                      {errors.model && (
                        <InputError message={errors.model.message} />
                      )}
                    </View>
                  </View>
                  <View style={styles.container}>
                    <Controller
                      control={control}
                      name="year"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <DropdownComponent
                          style={styles.input}
                          label="Select Year"
                          value={value}
                          onChange={onChange}
                          search={true}
                          data={years}
                        />
                      )}
                    />
                    {errors.year && (
                      <InputError message={errors.year.message} />
                    )}
                  </View>
                  <View style={styles.container}>
                    <Controller
                      control={control}
                      name="price"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[
                            styles.input,
                            errors.price && styles.errorInput,
                          ]}
                          placeholderTextColor={"#A09F9F"}
                          selectionColor={"#808080"}
                          placeholder="Price"
                          keyboardType="decimal-pad"
                          autoCorrect={false}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors.price && (
                      <InputError message={errors.price.message} />
                    )}
                  </View>
                  <View style={styles.container}>
                    <Controller
                      control={control}
                      name="plate_number"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[
                            styles.input,
                            errors.plate_number && styles.errorInput,
                          ]}
                          placeholderTextColor={"#A09F9F"}
                          selectionColor={"#808080"}
                          placeholder="Enter Vehicle Plate Number"
                          keyboardType="ascii-capable"
                          autoCapitalize="none"
                          autoCorrect={false}
                          textContentType="name"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors.plate_number && (
                      <InputError message={errors.plate_number.message} />
                    )}
                  </View>
                  <View style={styles.container}>
                    <Controller
                      control={control}
                      name="color"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[
                            styles.input,
                            errors.color && styles.errorInput,
                          ]}
                          placeholderTextColor={"#A09F9F"}
                          selectionColor={"#808080"}
                          placeholder="Vehicle Color"
                          keyboardType="ascii-capable"
                          autoCapitalize="none"
                          autoCorrect={false}
                          textContentType="name"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors.color && (
                      <InputError message={errors.color.message} />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      style={{
                        flexDirection: "row",
                        gap: 20,
                        marginBottom: 20,
                        alignItems: "center",
                      }}
                      onPress={pickImage}
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
                    </Pressable>
                  </View>
                  <FlatList
                    data={images}
                    keyExtractor={(item) => item.id}
                    numColumns={4}
                    scrollEnabled={false}
                    contentContainerStyle={{
                      padding: 4,
                    }}
                    columnWrapperStyle={{ gap: 12 }}
                    renderItem={({ item, index }) => (
                      <Upload
                        item={item}
                        index={index}
                        setImages={setImages}
                        setTargetItem={setTargetItem}
                      />
                    )}
                  />
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
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
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
                        numberOfLines={10}
                        keyboardType="ascii-capable"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const DeleteModal = ({ setVisible, setImages, data }) => {
  const removeItem = async () => {
    setImages((files) => files.filter((i) => i.id != data.id));

    setVisible(false);
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 30,
        padding: 30,
        gap: 30,
        alignItems: "center",
      }}
    >
      <Svg width="78" height="78" viewBox="0 0 78 78" fill="none">
        <Circle
          opacity="0.6"
          cx="38.8433"
          cy="38.8433"
          r="38.8433"
          fill="#FF7979"
        />
        <Circle
          opacity="0.6"
          cx="38.8431"
          cy="38.8432"
          r="31.7161"
          fill="#FF7979"
        />
        <Circle cx="38.8428" cy="38.8433" r="24.5889" fill="#FF7979" />
        <Path
          d="M35.0262 28.5594C35.2207 28.1038 35.6205 27.8196 36.0563 27.8196H40.3931C40.829 27.8196 41.2288 28.1038 41.4233 28.5594L41.6827 29.157H45.1406C45.7781 29.157 46.2932 29.7547 46.2932 30.4945C46.2932 31.2343 45.7781 31.832 45.1406 31.832H31.3089C30.6713 31.832 30.1562 31.2343 30.1562 30.4945C30.1562 29.7547 30.6713 29.157 31.3089 29.157H34.7668L35.0262 28.5594ZM31.3089 33.1694H45.1406V46.5441C45.1406 48.0195 44.1068 49.219 42.8353 49.219H33.6142C32.3427 49.219 31.3089 48.0195 31.3089 46.5441V33.1694ZM34.7668 35.8444C34.4498 35.8444 34.1905 36.1453 34.1905 36.5131V45.8754C34.1905 46.2432 34.4498 46.5441 34.7668 46.5441C35.0838 46.5441 35.3431 46.2432 35.3431 45.8754V36.5131C35.3431 36.1453 35.0838 35.8444 34.7668 35.8444ZM38.2247 35.8444C37.9078 35.8444 37.6484 36.1453 37.6484 36.5131V45.8754C37.6484 46.2432 37.9078 46.5441 38.2247 46.5441C38.5417 46.5441 38.8011 46.2432 38.8011 45.8754V36.5131C38.8011 36.1453 38.5417 35.8444 38.2247 35.8444ZM41.6827 35.8444C41.3657 35.8444 41.1063 36.1453 41.1063 36.5131V45.8754C41.1063 46.2432 41.3657 46.5441 41.6827 46.5441C41.9996 46.5441 42.259 46.2432 42.259 45.8754V36.5131C42.259 36.1453 41.9996 35.8444 41.6827 35.8444Z"
          fill="#A40000"
        />
      </Svg>
      <View>
        <Text
          style={{
            color: "#000000",
            fontFamily: "HostGroteskBold",
            fontSize: 18,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Delete Image
        </Text>
        <Text
          style={{
            color: "#000000",
            fontFamily: "HostGroteskBold",
            fontSize: 12,
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          You are about to delete an uploaded image. Do you want to proceed?
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          gap: 20,
          width: "100%",
        }}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            width: "100%",
            backgroundColor: "#F5F5F5",
            paddingVertical: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 12,
            }}
          >
            CANCEL
          </Text>
        </Pressable>
        <Pressable
          onPress={removeItem}
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 18,
            borderRadius: 12,
            opacity: 1,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 12,
            }}
          >
            DELETE
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const SuccessModal = ({ setVisible, setDone }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      setDone(false);
    }, 1000);
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 30,
        padding: 30,
        gap: 30,
        alignItems: "center",
      }}
    >
      <Svg width="103" height="103" viewBox="0 0 103 103" fill="none">
        <Circle cx="51.5" cy="51.5" r="51.5" fill="#E6F5E0" />
        <Path
          d="M31.3679 48.1029L41.6165 65.4476L76.0661 41.7638"
          stroke="#229D27"
          stroke-width="5.42609"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>

      <Text
        style={{
          color: "#000000",
          fontFamily: "HostGroteskBold",
          fontSize: 24,
          marginBottom: 3,
          textAlign: "center",
        }}
      >
        Successfully Removed
      </Text>
    </View>
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
