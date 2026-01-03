import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import { authService } from "@/api/authService";
import { InputError } from "@/components/input-error";
import ScalingDots from "@/components/scaling-dots";
import { arrowLeft, profileUpload } from "@/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import { Dropdown } from "react-native-element-dropdown";

const schema = yup.object().shape({
  phone_number: yup.string().trim().required("Phoone number is required"),
  gender: yup.string().trim().required("Kindly select a gender"),
  country_id: yup.string().trim().required("Kindly select a country"),
  state: yup.string().trim().required("Kindly select a state"),
  city: yup.string().trim().required("Kindly select a city"),
});

export default function completeProfile() {
  const app = useSelector((state: any) => state.app);
  const data = app.user;

  // console.log(data);

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

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
    defaultValues: data,
  });

  const country_id = watch("country_id");
  const state = watch("state");

  const onSubmit = async (payload: any) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      if (image) {
        formData.append("file", {
          uri: image.uri,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      // console.log("payload", formData);

      await authService.completeProfile(formData);

      router.push("/account/marketplace");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2:
          (error.errors !== undefined && error.errors[0]
            ? error.errors[0]
            : error.message) || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    if (!country_id) return;

    const res = await authService.getStates(country_id);

    setStates(
      res.data.map((item) => ({
        ...item,
        value: item.id,
        label: item.name,
      }))
    );
  };

  const fetchCities = async () => {
    if (!state) return;

    const res = await authService.getCities(state);

    setCities(
      res.data.map((item) => ({
        ...item,
        value: item.id,
        label: item.name,
      }))
    );
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await authService.getCountries();

      setCountries(
        res.data.map((item) => ({
          ...item,
          value: item.id,
          label: item.name,
        }))
      );
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates();
  }, [country_id]);

  useEffect(() => {
    fetchCities();
  }, [state]);

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#F5F5F5",
        justifyContent: "flex-start",
        paddingBottom: 20,
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={{ flex: 1 }}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={40}
            style={{
              position: "absolute",
              left: 3,
              top: 37,
              height: 70,
              width: 70,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
            }}
          >
            <SvgXml xml={arrowLeft()} width={21} height={16} />
          </Pressable>
          <View
            style={{
              flex: 1,
              height: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "HostGroteskBold",
                  width: "100%",
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Profile Setup
              </Text>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "HostGrotesk",
                    width: "100%",
                    textAlign: "center",
                    color: "#808080",
                  }}
                >
                  Add profile details and default
                </Text>
                <Text
                  style={{
                    fontFamily: "HostGrotesk",
                    width: "100%",
                    textAlign: "center",
                    color: "#808080",
                  }}
                >
                  delivery address for faster checkout.
                </Text>
              </View>

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
                    {image ? (
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 20,
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          fontFamily: "HostGrotesk",
                        }}
                      >
                        Upload Photo
                      </Text>
                    )}
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
                <View style={styles.container}>
                  <TextInput
                    style={[styles.input]}
                    placeholderTextColor={"#A09F9F"}
                    selectionColor={"#808080"}
                    placeholder="Name"
                    keyboardType="ascii-capable"
                    autoCapitalize="none"
                    autoCorrect={false}
                    readOnly={true}
                    textContentType="name"
                    value={data.name}
                  />
                </View>
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={"#A09F9F"}
                    selectionColor={"#808080"}
                    readOnly={true}
                    value={data.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                  />
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
                        placeholder="Phone Number"
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
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DropdownComponent
                        label="Select Gender"
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

                <View style={{ ...styles.container, flex: 1 }}>
                  <Controller
                    control={control}
                    name="country_id"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DropdownComponent
                        label="Select Country"
                        value={value}
                        onChange={onChange}
                        data={countries ? countries : []}
                      />
                    )}
                  />
                  {errors.country_id && (
                    <InputError message={errors.country_id.message} />
                  )}
                </View>
                <View style={{ ...styles.container, flex: 1 }}>
                  <Controller
                    control={control}
                    name="state"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DropdownComponent
                        label="Select State"
                        value={value}
                        onChange={onChange}
                        data={states ? states : []}
                      />
                    )}
                  />
                  {errors.state && (
                    <InputError message={errors.state.message} />
                  )}
                </View>
                <View style={{ ...styles.container, width: "100%" }}>
                  <Controller
                    control={control}
                    name="city"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DropdownComponent
                        label="Select City"
                        value={value}
                        onChange={onChange}
                        data={cities ? cities : []}
                      />
                    )}
                  />
                  {errors.city && <InputError message={errors.city.message} />}
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#100152",
                  padding: 20,
                  paddingHorizontal: 60,
                  borderRadius: 10,
                  marginTop: 10,
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                }}
                onPress={!loading ? handleSubmit(onSubmit) : () => {}}
              >
                {loading ? (
                  <ScalingDots
                    dotCount={3}
                    dotSize={9}
                    dotColor="#ffffff"
                    speed={300}
                    style={{
                      marginVertical: 5,
                    }}
                    scaleRange={[1, 1.5]}
                  />
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: 500,
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    PROCEED
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
