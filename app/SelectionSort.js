import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  Easing,
} from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import LessonHeader from "./LessonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { API } from "../constants/API";
import { Ionicons } from "@expo/vector-icons";

export default function SelectionSort() {
  const { top } = useSafeAreaInsets();
  const marginTop = top > 0 ? top : 0;
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonId } = route.params;
  const [lessonData, setLessonData] = useState(null);
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  const [items, setItems] = useState([
    { id: 1, value: 22 },
    { id: 2, value: 32 },
    { id: 3, value: 42 },
    { id: 4, value: 46 },
    { id: 5, value: 16 },
    { id: 6, value: 12 },
    { id: 7, value: 6 },
    { id: 8, value: 50 },
    { id: 9, value: 50 },
  ]);

  const [numElements, setNumElements] = useState("9");
  const [animationSpeed, setAnimationSpeed] = useState("500");
  const comparingIndices = useSharedValue([-1, -1]);
  const isSorting = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonResponse = await axios.get(
          `${API.GET_LESSONS}/${lessonId}`
        );
        setLessonData(lessonResponse.data);
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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const selectionSort = async () => {
    const arr = [...items];
    const n = arr.length;
    const speed = parseInt(animationSpeed, 10);
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        comparingIndices.value = [minIndex, j];
        await sleep(speed);

        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setItems([...arr]);
        await sleep(speed);
      }
      comparingIndices.value = [-1, -1];
      await sleep(speed);
    }
    isSorting.current = false;
  };

  const handleSort = () => {
    if (isSorting.current) return;
    isSorting.current = true;
    selectionSort();
  };

  const generateRandomArray = () => {
    const count = parseInt(numElements, 10);
    if (isNaN(count) || count <= 0) {
      alert("Vui lòng nhập một số hợp lệ");
      return;
    }
    const newArray = Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      value: Math.floor(Math.random() * 45) + 5, // Giá trị từ 5 đến 49
    }));
    setItems(newArray);
  };

  return (
    <View style={[styles.container, { marginTop }]}>
      <LessonHeader lessonData={lessonData} />
      <View style={{ padding: 10, flex: 1 }}>
        <View style={styles.content}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={styles.sectionTitle}>Lý thuyết</Text>
            <Pressable onPress={() => setIsTheoryVisible(!isTheoryVisible)}>
              {isTheoryVisible ? (
                <Ionicons name="eye" size={24} color="black" />
              ) : (
                <Ionicons name="eye-off" size={24} color="black" />
              )}
            </Pressable>
          </View>
          {isTheoryVisible && (
            <View style={styles.theoryContainer}>
              <Text style={styles.theoryText}>{lessonData.theory}</Text>
            </View>
          )}
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Cài đặt</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Số phần tử:</Text>
              <TextInput
                style={styles.input}
                value={numElements}
                onChangeText={setNumElements}
                keyboardType="numeric"
                placeholder="Số phần tử"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Tốc độ (ms):</Text>
              <TextInput
                style={styles.input}
                value={animationSpeed}
                onChangeText={setAnimationSpeed}
                keyboardType="numeric"
                placeholder="Tốc độ (ms)"
              />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.button}
              onPress={generateRandomArray}
            >
              <Text style={styles.buttonText}>Tạo mảng mới</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.sortButton]}
              onPress={handleSort}
              disabled={isSorting.current}
            >
              <Text style={styles.buttonText}>Sắp xếp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.visualizationArea}>
          {items.map((item, index) => (
            <SelectionSortItem
              key={item.id}
              item={item}
              index={index}
              totalItems={items.length}
              comparingIndices={comparingIndices}
              animationSpeed={parseInt(animationSpeed, 10)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function SelectionSortItem({
  item,
  index,
  totalItems,
  comparingIndices,
  animationSpeed,
}) {
  const isComparing = useDerivedValue(() => {
    return comparingIndices.value.includes(index);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: item.value * 4,
      left: withTiming((index / totalItems) * 100 + "%", {
        duration: animationSpeed,
      }),
      backgroundColor: withTiming(isComparing.value ? "red" : "blue", {
        duration: animationSpeed * 0.6,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text style={styles.itemText}>{item.value}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#2667df",
  },
  headerText: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2667df",
    textAlign: "center",
  },
  content: {
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  inputWrapper: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#2667df",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  sortButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  visualizationArea: {
    flex: 1,
    position: "relative",
    marginTop: 20,
  },
  item: {
    position: "absolute",
    width: "8%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "flex-end",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
  },
  itemText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  theoryContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  theoryText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 10,
  },
});
