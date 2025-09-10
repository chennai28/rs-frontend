import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  stage: 1 | 2 | 3; // onboarding = 1, auth = 2, signup/signin = 3
};

export default function BlobBackground({ stage }: Props) {
  const getBlob = () => {
    switch (stage) {
      case 1:
        return require("../../assets/haikei/blob1.svg").default;
      case 2:
        return require("../../assets/haikei/blob2.svg").default;
      case 3:
        return require("../../assets/haikei/blob3.svg").default;
    }
  };

  const Blob = getBlob();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Blob width="100%" height="100%" />
    </View>
  );
}
