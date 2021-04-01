import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// utils
import { colors } from "../utils/colors";

const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}
    >
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      borderColor: "#fff",
      borderWidth: 2,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colors.white,
      fontSize: size / 3,
    },
  });
