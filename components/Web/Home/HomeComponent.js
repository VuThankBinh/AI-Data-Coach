import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../HeaderComponent";
import HomeItem from "./HomeItem";
import FooterComponent from "../FooterComponent";

function Home() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ zIndex: 99999 }}>
        <HeaderComponent />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Bắt đầu học code cùng{"\n"}gia sư AI thông minh!!!
        </Text>
        <Image
          source={require("../../../assets/images/robot.png")}
          style={styles.image}
        />
      </View>
      <View
        style={{
          ...styles.container,
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
      >
        <HomeItem
          title="Lớp học"
          description="Tham gia vào lớp học của bạn, giáo viên"
          image={require("../../../assets/images/icon-home-item-1.png")}
        />
        <HomeItem
          title="Lý thuyết"
          description="Bắt đầu học những kiến thức nền tảng của những môn học lập trình"
          image={require("../../../assets/images/icon-home-item-2.png")}
          onPress={() => navigation.navigate("Course")}
        />
        <HomeItem
          title="Thực hành"
          description="Bắt đầu thực hành ngay với những kiến thức mà bạn đã được học"
          image={require("../../../assets/images/icon-home-item-3.png")}
          onPress={() => navigation.navigate("Course", { practice: true })}
        />
      </View>
      <FooterComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2667df",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default Home;
