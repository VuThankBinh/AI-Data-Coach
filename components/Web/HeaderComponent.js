import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NormalButton from "../NormalButton";
import RoundImage from "../RoundImage";
import InfoComponent from "./InfoComponent";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HeaderComponent() {
  const navigation = useNavigation();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
        <View style={styles.navigationContainer}>
          <View style={styles.roundContainer}>
            <Pressable>
              <Text style={styles.textButton}>Trang chủ</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.textButton}>Lớp học</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.textButton}>Khóa học</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.textButton}>Giới thiệu</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <NormalButton
            style={{ backgroundColor: "#fff", marginHorizontal: 10 }}
            title={"Tham gia lớp học"}
            textStyle={{ color: "#2667df" }}
          />
          <NormalButton
            style={{ backgroundColor: "#2667df", marginHorizontal: 10 }}
            title={"Bắt đầu khóa học"}
            onPress={() => navigation.navigate("Course")}
          />
          <View style={{ position: "relative" }}>
            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
              <FontAwesome name="user-circle-o" size={32} color="gray" />
            </TouchableOpacity>
            {showInfo && (
              <View style={[styles.infoContainer, { marginTop: 10 }]}>
                <InfoComponent />
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navigationContainer: {
    width: "30%",
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    height: 40,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  logo: {
    height: 60,
    width: 120,
    resizeMode: "contain",
  },
  textButton: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#595757",
  },
  avatar: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
  },
  infoContainer: {
    position: "absolute",
    top: "100%",
    right: -20,
    zIndex: 99999,
  },
});
