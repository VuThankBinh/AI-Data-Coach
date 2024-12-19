import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TokenStorage from "../constants/TokenStorage";
import { API } from "../constants/API";
import axios from "axios";

const UserInfo = () => {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 0;
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState(null);
  const [tab, setTab] = useState([1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = await TokenStorage.getToken();
      if (!token) {
        console.error("Không có token, vui lòng đăng nhập.");
        navigation.navigate("Login");
        return;
      }
      try {
        const response = await axios.get(API.GET_USER_INFO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Dữ liệu nhận được từ API: ", response.data);
        setUserInfo(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setTel(response.data.user.tel);
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
        navigation.navigate("Login");
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  const validateUserInfo = () => {
    if (!name || !email || !tel) {
      console.log("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      console.log("Email không hợp lệ.");
      return false;
    }
    // Kiểm tra số điện thoại (ví dụ: chỉ cho phép số)
    if (!/^\d+$/.test(tel)) {
      console.log("Số điện thoại không hợp lệ.");
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    const token = await TokenStorage.getToken();
    if (!token) {
      console.error("Không có token, vui lòng đăng nhập.");
      setModalVisible(false);
      navigation.navigate("Login");
      return;
    }
    try {
      if (newPassword !== reNewPassword) {
        console.log("Mật khẩu không khớp");
        return;
      }
      if (!validateUserInfo()) {
        return; // Ngừng thực hiện nếu thông tin không hợp lệ
      }
      const response = await axios.post(
        API.CHANGE_PASSWORD,
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
          userId: userInfo.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Đặt lại mật khẩu thành công");
      } else {
        console.log("Đặt lại mật khẩu thất bại");
      }
    } catch (error) {
      console.log("Lỗi khi đặt lại mật khẩu: " + error);
    }
  };

  return (
    <View style={[styles.container, { marginTop }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông tin tài khoản</Text>
      </View>

      {/* tabs */}
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          justifyContent: "center",
          margin: 10,
        }}
      >
        <TouchableOpacity onPress={() => setTab(1)}>
          <Text
            style={{
              textDecorationColor: "#2667df",
              textDecorationLine: tab == 1 ? "underline" : "none",
              fontSize: 16,
              color: tab == 1 ? "#2667df" : "#000",
            }}
          >
            Tài khoản
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(2)}>
          <Text
            style={{
              textDecorationColor: "#2667df",
              textDecorationLine: tab == 2 ? "underline" : "none",
              fontSize: 16,
              color: tab == 2 ? "#2667df" : "#000",
            }}
          >
            Mật khẩu
          </Text>
        </TouchableOpacity>
      </View>

      {/* info */}
      <View
        style={[styles.infoContainer, { display: tab == 1 ? "flex" : "none" }]}
      >
        <Text style={styles.label}>Họ tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ tên"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={tel}
          onChangeText={(text) => setTel(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>

      {/* password */}
      <View
        style={[styles.infoContainer, { display: tab == 2 ? "flex" : "none" }]}
      >
        <Text style={styles.label}>Mật khẩu cũ</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderWidth: 0 }]}
            placeholder="Mật khẩu cũ"
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            secureTextEntry={!showOldPassword}
          />
          <TouchableOpacity
            onPress={() => setShowOldPassword(!showOldPassword)}
          >
            <Ionicons name={showOldPassword ? "eye-off" : "eye"} size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Mật khẩu mới</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderWidth: 0 }]}
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Nhập lại mật khẩu cũ</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderWidth: 0 }]}
            placeholder="Nhập lại mật khẩu cũ"
            value={reNewPassword}
            onChangeText={(text) => setReNewPassword(text)}
            secureTextEntry={!showReNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowReNewPassword(!showReNewPassword)}
          >
            <Ionicons name={showReNewPassword ? "eye-off" : "eye"} size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.statusBar,
    paddingVertical: 10,
    // justifyContent: "space-between",
  },
  headerButton: {
    padding: 10,
  },
  headerRightButton: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginRight: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
  },
  headerButtonText: {
    fontSize: 18,
    color: "#000",
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginHorizontal: "10%",
    padding: 10,
    gap: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 4,
    flex: 1,
  },
  button: {
    backgroundColor: "#2667df",
    width: 200,
    padding: 10,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    paddingRight: 10,
  },
});

export default UserInfo;
