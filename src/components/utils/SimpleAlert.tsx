import React from 'react'
import { Alert } from "react-native";

export const SimpleAlert = () => {
    const createSimpleAlert = (title:string,subTitle:string = "") =>
    Alert.alert(
      title,
      subTitle,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  return createSimpleAlert
}
