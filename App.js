import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// features
import Focus from "./src/features/focus/Focus";

// utils
import { colors } from "./src/utils/colors";

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Text>Here is where I am going to build a focus timer!</Text>
      ) : (
        <Focus addSubject={setFocusSubject} subject={focusSubject} />
      )}
      <Text>{focusSubject}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
