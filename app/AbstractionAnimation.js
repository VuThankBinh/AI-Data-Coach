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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API } from "../constants/API";
import LessonHeader from "./LessonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default AbstractionAnimation = () => {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 0;
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonId } = route.params;

  const [lessonData, setLessonData] = useState(null);
  const [codeExercise, setCodeExercise] = useState(null);

  const [step, setStep] = useState(0);

  const abstractClassOpacity = useSharedValue(1);
  const concreteClassOpacity = useSharedValue(0);
  const implementationOpacity = useSharedValue(0);
  const usageOpacity = useSharedValue(0);

  const abstractClassStyle = useAnimatedStyle(() => ({
    opacity: abstractClassOpacity.value,
    transform: [{ scale: abstractClassOpacity.value }],
  }));

  const concreteClassStyle = useAnimatedStyle(() => ({
    opacity: concreteClassOpacity.value,
    transform: [
      { translateY: withSpring((1 - concreteClassOpacity.value) * 50) },
    ],
  }));

  const implementationStyle = useAnimatedStyle(() => ({
    opacity: implementationOpacity.value,
  }));

  const usageStyle = useAnimatedStyle(() => ({
    opacity: usageOpacity.value,
  }));

  const steps = [
    {
      title: "Lớp trừu tượng",
      content:
        "Định nghĩa một giao diện chung cho một nhóm các đối tượng liên quan.",
    },
    {
      title: "Lớp cụ thể",
      content: "Triển khai các phương thức trừu tượng từ lớp cha.",
    },
    {
      title: "Triển khai",
      content: "Cung cấp cài đặt cụ thể cho các phương thức trừu tượng.",
    },
    {
      title: "Sử dụng",
      content: "Sử dụng đối tượng thông qua giao diện trừu tượng.",
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

  const nextStep = () => {
    setStep((prevStep) => {
      const newStep = (prevStep + 1) % steps.length;
      switch (newStep) {
        case 0:
          abstractClassOpacity.value = withTiming(1);
          concreteClassOpacity.value = withTiming(0);
          implementationOpacity.value = withTiming(0);
          usageOpacity.value = withTiming(0);
          break;
        case 1:
          concreteClassOpacity.value = withTiming(1);
          break;
        case 2:
          implementationOpacity.value = withTiming(1);
          break;
        case 3:
          usageOpacity.value = withTiming(1);
          break;
      }
      return newStep;
    });
  };

  const handlePractice = () => {
    if (codeExercise) {
      navigation.navigate("Practice", {
        algorithm: "AbstractionAnimation",
        exercise: codeExercise[0],
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Dữ liệu bài tập chưa sẵn sàng. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <View style={[styles.container, { marginTop }]}>
      <LessonHeader lessonData={lessonData} />

      <Text style={styles.title}>Tính trừu tượng trong OOP</Text>

      <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.classBox, abstractClassStyle]}>
            <Text style={styles.className}>abstract class Shape</Text>
            <View style={styles.classDivider} />
            <Text style={styles.classContent}>
              + abstract getArea(): number
            </Text>
            <Text style={styles.classContent}>
              + abstract getPerimeter(): number
            </Text>
          </Animated.View>

          <Animated.View style={[styles.classBox, concreteClassStyle]}>
            <Text style={styles.className}>class Circle extends Shape</Text>
            <View style={styles.classDivider} />
            <Text style={styles.classContent}>- radius: number</Text>
            <View style={styles.classDivider} />
            <Animated.Text style={[styles.classContent, implementationStyle]}>
              + getArea(): number
            </Animated.Text>
            <Animated.Text style={[styles.classContent, implementationStyle]}>
              + getPerimeter(): number
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.usageBox, usageStyle]}>
            <Text style={styles.usageContent}>
              Shape shape = new Circle(5);
            </Text>
            <Text style={styles.usageContent}>
              double area = shape.getArea();
            </Text>
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
  className: {
    fontSize: 18,
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
  usageBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    width: width * 0.8,
  },
  usageContent: {
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
