import { StyleSheet, Text, View, Pressable, Image } from "react-native";
export default function HomeItemComponent({
  title,
  description,
  image,
  onPress,
}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    top: -35,
    alignSelf: "center",
  },
  image: {
    width: 90,
    height: 90,
    backgroundColor: "#e5efff",
    resizeMode: "contain",
    borderRadius: 1000,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 60,
    paddingTop: 55, // Tăng padding phía trên để có chỗ cho hình ảnh
    paddingBottom: 40,
    borderRadius: 10,
    marginTop: 35, // Thêm margin phía trên để cân bằng với hình ảnh
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    textAlign: "center",
  },
});
