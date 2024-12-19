import { Image, Pressable, StyleSheet, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import RoundImage from "../../RoundImage";
import InfoComponent from "../InfoComponent";
import { theme } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

export default function HeaderComponent({
  isSidebarVisible,
  setIsSidebarVisible,
}) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Pressable
          style={styles.iconMenu}
          onPress={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          <Ionicons name="menu-outline" size={40} color={"black"} />
        </Pressable>
        <Link href={"/Home"}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/logo.png")}
          />
        </Link>
      </View>
      <View style={{ position: "relative" }}>
        {/* <FontAwesome name="user-circle-o" size={32} color="gray" /> */}

        {/* <RoundImage
          style={styles.avatar}
          source={require("../../../assets/images/logo.png")}
          onPress={() => setShowInfo(!showInfo)}
        />
        {showInfo && (
          <View style={styles.infoContainer}>
            <InfoComponent />
          </View>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 60,
    width: 120,
    resizeMode: "contain",
    marginLeft: 10,
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
    right: -5,
    zIndex: 1000,
  },
  iconMenu: {
    paddingHorizontal: 10,
  },
});
