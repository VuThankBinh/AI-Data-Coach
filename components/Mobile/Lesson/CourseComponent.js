import { View, Text, StatusBar, ScrollView, StyleSheet } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { theme } from "../../../constants/theme";
import { Picker } from "@react-native-picker/picker";
import LessonComponent from "./LessonComponent";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TokenStorage from "../../../constants/TokenStorage";
import axios from "axios";
import { API } from "../../../constants/API";

const CourseComponent = () => {
  const navigation = useNavigation();

  const [subjects, setSubjects] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [lessons, setLessons] = useState();
  const [modalVisible, setModalVisible] = useState(true);

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
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#6fa8dc"} />
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Picker
            style={styles.picker}
            selectedValue={selectedSubject?._id}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setSelectedSubject(subjects[itemIndex]);
            }}
          >
            {subjects.map((item) => (
              <Picker.Item key={item._id} label={item.name} value={item._id} />
            ))}
          </Picker>
        </View>
        <ScrollView>
          <View style={{ flex: 1, alignItems: "center" }}>
            {lessons?.map((item) => (
              <LessonComponent
                key={item._id}
                style={{ marginHorizontal: 17, marginTop: 15, width: 480 }}
                imageStyle={{
                  height: 240,
                  borderRadius: 10,
                }}
                image={item.image}
                title={item.name}
                condition={item.condition}
                status={item.condition}
                onPress={() => {
                  navigation.navigate(`${item.source}`, {
                    lessonId: item._id,
                  });
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  abc: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f6f4f4",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    height: 120,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: "#6fa8dc",
  },
  picker: {
    backgroundColor: "#FFF",
    width: 350,
  },
});

export default CourseComponent;
