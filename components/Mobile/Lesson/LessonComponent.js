import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import { theme } from "../../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

const images = {
  "bubble-sort.png": require("../../../assets/images/bubble-sort.png"),
  "selection-sort.png": require("../../../assets/images/selection-sort.png"),
  "insertion-sort.png": require("../../../assets/images/insertion-sort.png"),
  "inner.png": require("../../../assets/images/inner.png"),
  "select.png": require("../../../assets/images/select.png"),
  "where.png": require("../../../assets/images/where.png"),
  "abstraction.png": require("../../../assets/images/abstraction.png"),
  "inheritance.png": require("../../../assets/images/inheritance.png"),
  "object.png": require("../../../assets/images/object.png"),
};

const LessonComponent = ({
  style,
  imageStyle,
  image,
  title,
  condition,
  status,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, style]}>
        <View style={{ alignItems: "center" }}>
          <Image style={[styles.image, imageStyle]} source={images[image]} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.statusContainer}>
          {getIcon(condition)}
          {getText(condition, status)}
        </View>
      </View>
    </Pressable>
  );
};

const getIcon = (condition) => {
  if (condition == "0/2") {
    return <Ionicons name="book" size={24} color="black" />;
  } else if (condition == "2/2") {
    return <Ionicons name="checkmark-circle" size={24} color="green" />;
  } else {
    return <Ionicons name="time" size={24} color="yellow" />;
  }
};

const getText = (condition, status) => {
  if (condition == "0/2") {
    return <Text style={styles.status}>Chưa học</Text>;
  } else if (condition == "2/2") {
    return <Text style={styles.status}>Đã học</Text>;
  } else {
    return <Text style={styles.status}>Đang học {status}</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderBlockColor: theme.colors.border,
    borderCurve: "continuous",
  },
  image: {
    height: 125,
    width: "100%",
    resizeMode: "contain",
  },
  title: { fontSize: 16, fontWeight: "bold", margin: 10 },
  statusContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default LessonComponent;
