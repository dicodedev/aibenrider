import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export const DropdownComponent = ({
  style,
  label,
  value,
  onChange,
  data,
  search,
  itemBackgroundColor,
  containerBackgroundColor,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Dropdown
      style={[style]}
      placeholderStyle={{ color: "#A09F9F" }}
      selectedTextStyle={{
        color: "#000",
      }}
      containerStyle={{
        marginTop: 6,
        borderRadius: 15,
        backgroundColor: containerBackgroundColor ?? "#F5F5F5",
      }}
      itemContainerStyle={{
        backgroundColor: itemBackgroundColor ?? "#F5F5F5",
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
