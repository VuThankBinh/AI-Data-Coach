import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderComponent from "./HeaderComponent";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useLayoutEffect } from "react";
import { theme } from "../../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import LessonComponent from "../../Mobile/Lesson/LessonComponent";
import TokenStorage from "../../../constants/TokenStorage";
import axios from "axios";
import { API } from "../../../constants/API";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CourseMain() {
  const navigation = useNavigation();
  const route = useRoute();
  const { practice } = route?.params || false;
  const [subjects, setSubjects] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [lessons, setLessons] = useState();
  const [selectedSideTab, setSelectedSideTab] = useState(practice ? 2 : 1);
  const [modalVisible, setModalVisible] = useState(true);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useLayoutEffect(() => {
    const fetchSubjects = async () => {
      const token = await TokenStorage.getToken();
      if (!token) {
        console.error("Không có token, vui lòng đăng nhập.");
        setModalVisible(false);
        navigation.navigate("Login");
        return;
      }
      try {
        const response = await axios.get(API.GET_SUBJECTS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Dữ liệu nhận được từ API: ", response.data);
        setSubjects(response.data);
        setSelectedSubject(response.data[0]);
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    };

    fetchSubjects();
  }, []);

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
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
        setModalVisible(false);
        navigation.navigate("Login");
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      const token = await TokenStorage.getToken();
      if (!token) {
        console.error("Không có token, vui lòng đăng nhập.");
        navigation.navigate("Login");
        return;
      }
      try {
        const response = await axios.get(
          `${API.GET_LESSONS}/user/${userInfo?.userId}/subject/${selectedSubject?._id}`
        );
        console.log("Dữ liệu nhận được từ API: ", response.data);
        setLessons(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    };

    if (userInfo && selectedSubject) {
      fetchLessons();
    }
  }, [selectedSubject, userInfo]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Side bar */}
        {isSidebarVisible && (
          <View style={styles.sideBar}>
            <Text style={styles.sideBarText}>Môn học bạn chọn</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedSubject?._id}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setSelectedSubject(subjects[itemIndex]);
              }}
            >
              {subjects.map((item) => (
                <Picker.Item
                  key={item._id}
                  label={item.name}
                  value={item._id}
                />
              ))}
            </Picker>
            <Pressable
              onPress={() => setSelectedSideTab(1)}
              style={[
                styles.sideBarItem,
                selectedSideTab == 1
                  ? { backgroundColor: "rgba(107, 143, 207, 0.54)" }
                  : null,
              ]}
            >
              <Ionicons
                name={selectedSideTab == 1 ? "book" : "book-outline"}
                size={24}
                color={selectedSideTab == 1 ? "#2667df" : "black"}
              />
              <Text
                selectable={false}
                style={[
                  styles.sidebarItemText,
                  selectedSideTab == 1
                    ? { fontWeight: "bold", color: "#2667df" }
                    : null,
                ]}
              >
                Lý thuyết
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedSideTab(2)}
              style={[
                styles.sideBarItem,
                selectedSideTab == 2
                  ? { backgroundColor: "rgba(107, 143, 207, 0.54)" }
                  : null,
              ]}
            >
              <Ionicons
                name={
                  selectedSideTab == 2 ? "code-slash" : "code-slash-outline"
                }
                size={24}
                color={selectedSideTab == 2 ? "#2667df" : "black"}
              />
              <Text
                selectable={false}
                style={[
                  styles.sidebarItemText,
                  selectedSideTab == 2
                    ? { fontWeight: "bold", color: "#2667df" }
                    : null,
                ]}
              >
                Thực hành
              </Text>
            </Pressable>
          </View>
        )}

        {/* modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeIcon}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
              <Text style={styles.modalText}>Bạn muốn bắt đầu học</Text>
              {subjects.map((item) => (
                <Pressable
                  key={item._id}
                  style={[
                    styles.modalButton,
                    hoveredButton === item.name && styles.hoveredButton,
                  ]}
                  onPress={() => {
                    setSelectedSubject(item);

                    setModalVisible(false);
                  }}
                  onMouseEnter={() => setHoveredButton(item.name)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Text selectable={false} style={styles.modalButtonText}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: "#2667df", borderRadius: 12 },
                ]}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text
                  selectable={false}
                  style={[styles.modalButtonText, { color: "#FFF" }]}
                >
                  Đóng
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* content */}
        <View
          style={{
            flex: 1,
            width: isSidebarVisible ? "85%" : "100%",
          }}
        >
          <Text style={styles.contentHeader}>Các bài học</Text>
          <View style={styles.content}>
            {lessons?.map((item) => (
              <LessonComponent
                key={item._id}
                style={{ marginHorizontal: 17, marginTop: 15, width: 320 }}
                imageStyle={{
                  height: 160,
                  borderRadius: 10,
                }}
                image={item.image}
                title={item.name}
                condition={item.condition}
                status={item.condition}
                onPress={() => {
                  const lessonId = item._id;
                  if (selectedSideTab == 1) {
                    navigation.navigate(`${item.source}`, {
                      lessonId: item._id,
                    });
                  } else {
                    navigation.navigate("Practice", {
                      lessonId: item._id,
                    });
                  }
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    width: "15%",
    minWidth: 200,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRightWidth: 1,
    borderColor: theme.colors.border,
    gap: 10,
    padding: 10,
  },
  sideBarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "#f6f4f4",
    padding: 10,
    borderRadius: 12,
    borderColor: theme.colors.border,
    fontSize: 16,
  },
  sideBarItem: {
    padding: 10,
    width: "100%",
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
  },
  sidebarItemText: {
    fontSize: 18,
  },

  modalView: {
    marginTop: "10%",
    marginHorizontal: "30%",
    padding: 20,
    paddingHorizontal: 40,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 36,
    position: "relative",
    gap: 10,
  },
  closeIcon: {
    position: "absolute",
    // backgroundColor: "#FEF",
    padding: 10,
    top: 0,
    right: 0,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
  },
  modalButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    borderRadius: 100,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  contentHeader: {
    fontSize: 20,
    marginTop: 20,
    marginHorizontal: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  hoveredButton: {
    backgroundColor: "rgba(107, 143, 207, 0.54)",
  },
});
