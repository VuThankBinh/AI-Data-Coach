import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../constants/theme";
import { Picker } from "@react-native-picker/picker";
import { API } from "../../../constants/API";
import TokenStorage from "../../../constants/TokenStorage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Exercise = () => {
  const navigation = useNavigation();

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 0;

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
    <View style={([styles.container], { marginTop })}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thực hành</Text>
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
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
          {lessons?.map((item) => (
            <ExerciseItem
              key={item._id}
              item={item}
              navigation={navigation}
              isSelected={selectedExercise === item._id}
              onSelect={() => setSelectedExercise(item._id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const getIcon = (condition) => {
  if (condition == "0/2") {
    return <Ionicons name="book" size={40} color="black" />;
  } else if (condition == "2/2") {
    return <Ionicons name="checkmark-circle" size={40} color="green" />;
  } else {
    return <Ionicons name="time" size={40} color="yellow" />;
  }
};

const ExerciseItem = ({ item, isSelected, onSelect, navigation }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onSelect();
  };

  return (
    <TouchableOpacity onPress={handleClick} style={styles.exercise}>
      <View style={styles.exerciseContainer}>
        <Ionicons name="document-text" size={80} color="#2b78e4" />
        <Text style={styles.exerciseTitle}>Thực hành {item.name}</Text>
        {getIcon(item.condition)}
      </View>
      {isClicked && isSelected && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Practice", {
              lessonId: item._id,
            });
          }}
        >
          <Text style={styles.buttonText}>Làm bài</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.statusBar,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  picker: {
    backgroundColor: "#FFF",
    width: "50%",
  },
  exercise: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseTitle: {
    flex: 1,
    fontSize: 17,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Exercise;
