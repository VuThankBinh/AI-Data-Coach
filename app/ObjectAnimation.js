import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API } from "../constants/API";
import LessonHeader from "./LessonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const ObjectAnimation = () => {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 0;
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonId } = route.params;

  const [lessonData, setLessonData] = useState(null);
  const [codeExercise, setCodeExercise] = useState(null);

  const [step, setStep] = useState(0);

  const classOpacity = useSharedValue(1);
  const objectOpacity = useSharedValue(0);
  const propertyOpacity = useSharedValue(0);
  const methodOpacity = useSharedValue(0);

  const classAnimatedStyle = useAnimatedStyle(() => ({
    opacity: classOpacity.value,
    transform: [{ scale: classOpacity.value }],
  }));

  const objectAnimatedStyle = useAnimatedStyle(() => ({
    opacity: objectOpacity.value,
    transform: [{ translateY: withSpring((1 - objectOpacity.value) * 50) }],
  }));

  const propertyAnimatedStyle = useAnimatedStyle(() => ({
    opacity: propertyOpacity.value,
  }));

  const methodAnimatedStyle = useAnimatedStyle(() => ({
    opacity: methodOpacity.value,
  }));

  const steps = [
    {
      title: "Định nghĩa Class",
      content:
        "Class là một bản thiết kế cho đối tượng. Nó định nghĩa các thuộc tính và phương thức mà đối tượng sẽ có.",
    },
    {
      title: "Tạo Object",
      content:
        "Object là một thể hiện cụ thể của class. Nó được tạo ra dựa trên bản thiết kế của class.",
    },
    {
      title: "Truy cập thuộc tính",
      content:
        "Chúng ta có thể truy cập và thay đổi các thuộc tính của object.",
    },
    {
      title: "Gọi phương thức",
      content:
        "Chúng ta có thể gọi các phương thức được định nghĩa trong class thông qua object.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonResponse = await axios.get(
          `${API.GET_LESSONS}/${lessonId}`
        );
        setLessonData(lessonResponse.data);

        const exerciseResponse = await axios.get(
          `${API.API_URL}/lessons/${lessonId}/code-exercises`
        );
        setCodeExercise(exerciseResponse.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        Alert.alert(
          "Lỗi",
          "Không thể tải dữ liệu bài học. Vui lòng thử lại sau."
        );
      }
    };

    fetchData();
  }, [lessonId]);

  const handlePractice = () => {
    if (codeExercise) {
      navigation.navigate("Practice", {
        algorithm: "ObjectAnimation",
        exercise: codeExercise[0],
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Dữ liệu bài tập chưa sẵn sàng. Vui lòng thử lại sau."
      );
    }
  };

  const nextStep = () => {
    setStep((prevStep) => {
      const newStep = (prevStep + 1) % steps.length;
      switch (newStep) {
        case 0:
          classOpacity.value = withTiming(1);
          objectOpacity.value = withTiming(0);
          propertyOpacity.value = withTiming(0);
          methodOpacity.value = withTiming(0);
          break;
        case 1:
          objectOpacity.value = withTiming(1);
          break;
        case 2:
          propertyOpacity.value = withTiming(1);
          break;
        case 3:
          methodOpacity.value = withTiming(1);
          break;
      }
      return newStep;
    });
  };

  return (
    <View style={[styles.container, { marginTop }]}>
      <LessonHeader lessonData={lessonData} />
      <Text style={styles.title}>
        Lập trình hướng đối tượng: Class và Object
      </Text>

      <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.classBox, classAnimatedStyle]}>
            <Text style={styles.className}>Car</Text>
            <View style={styles.classDivider} />
            <Text style={styles.classContent}>+ color: string</Text>
            <View style={styles.classDivider} />
            <Text style={styles.classContent}>+ start(): void</Text>
          </Animated.View>

          <Animated.View style={[styles.objectBox, objectAnimatedStyle]}>
            <Text style={styles.objectTitle}>MyCar = new Car('đỏ')</Text>
            <View style={styles.classDivider} />
            <Animated.Text style={[styles.classContent, propertyAnimatedStyle]}>
              color: 'đỏ'
            </Animated.Text>
            <Animated.Text style={[styles.classContent, methodAnimatedStyle]}>
              start()
            </Animated.Text>
          </Animated.View>
        </View>

        <View style={styles.stepDescription}>
          <Text style={styles.stepTitle}>{steps[step].title}</Text>
          <Text style={styles.stepContent}>{steps[step].content}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>Bước tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  classBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    width: width * 0.4,
    padding: 10,
    marginBottom: 20,
  },
  objectBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    width: width * 0.4,
    padding: 10,
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  objectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  classDivider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 5,
  },
  classContent: {
    fontSize: 14,
    marginLeft: 10,
  },
  stepDescription: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  stepContent: {
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButton: {
    padding: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: "#2667df",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2667df",
    textAlign: "center",
  },
});

export default ObjectAnimation;
