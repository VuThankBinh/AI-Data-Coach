import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useDerivedValue, withTiming, Easing } from "react-native-reanimated";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API } from '../constants/API';

export default function BubbleSort() {
    const navigation = useNavigation();
    const route = useRoute();
    const { lessonId } = route.params;

    const [lessonData, setLessonData] = useState(null);
    const [codeExercise, setCodeExercise] = useState(null);
    const [items, setItems] = useState([
        { id: 1, value: 22 },
        { id: 2, value: 32 },
        { id: 3, value: 42 },
        { id: 4, value: 46 },
        { id: 5, value: 16 },
        { id: 6, value: 12 },
        { id: 7, value: 6 },
        { id: 8, value: 50 },
        { id: 9, value: 50 }
    ]);

    const [numElements, setNumElements] = useState('9');
    const [animationSpeed, setAnimationSpeed] = useState('500');
    const swappingIndices = useSharedValue([-1, -1]);
    const isSorting = useRef(false);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lessonResponse = await axios.get(`${API.GET_LESSON}/${lessonId}`);
                setLessonData(lessonResponse.data);

                const exerciseResponse = await axios.get(`${API.API_URL}/lessons/${lessonId}/code-exercises`);
                setCodeExercise(exerciseResponse.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
                Alert.alert('Lỗi', 'Không thể tải dữ liệu bài học. Vui lòng thử lại sau.');
            }
        };

        fetchData();
    }, [lessonId]);

    const bubbleSort = async () => {
        const arr = [...items];
        const n = arr.length;
        const speed = parseInt(animationSpeed, 10);
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                swappingIndices.value = [j, j + 1];
                await sleep(speed);

                if (arr[j].value > arr[j + 1].value) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setItems([...arr]);
                    await sleep(speed);
                }

                swappingIndices.value = [-1, -1];
                await sleep(speed);
            }
        }
        isSorting.current = false;
    };

    const handleSort = () => {
        if (isSorting.current) return;
        isSorting.current = true;
        bubbleSort();
    };

    const generateRandomArray = () => {
        const count = parseInt(numElements, 10);
        if (isNaN(count) || count <= 0) {
            alert('Vui lòng nhập một số hợp lệ');
            return;
        }
        const newArray = Array.from({ length: count }, (_, index) => ({
            id: index + 1,
            value: Math.floor(Math.random() * 45) + 5, // Giá trị từ 5 đến 49
        }));
        setItems(newArray);
    };

    const handlePractice = () => {
        if (codeExercise) {
            navigation.navigate('Practice', {
                algorithm: 'BubbleSort',
                exercise: codeExercise[0]
            });
        } else {
            Alert.alert('Thông báo', 'Dữ liệu bài tập chưa sẵn sàng. Vui lòng thử lại sau.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>← Quay lại</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {lessonData ? lessonData.name : 'Thuật toán Bubble Sort'}
                </Text>
                <TouchableOpacity onPress={() => handlePractice(lessonId)} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Thực hành</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
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
                    <BubbleSortItem
                        key={item.id}
                        item={item}
                        index={index}
                        totalItems={items.length}
                        swappingIndices={swappingIndices}
                        animationSpeed={parseInt(animationSpeed, 10)}
                    />
                ))}
            </View>
        </View>
    );
};

function BubbleSortItem({ item, index, totalItems, swappingIndices, animationSpeed }) {
    const isSwapping = useDerivedValue(() => {
        return swappingIndices.value.includes(index);
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: item.value * 4,
            left: withSpring((index / totalItems) * 100 + '%', { duration: animationSpeed }),
            backgroundColor: withTiming(
                isSwapping.value ? 'red' : 'green',
                {
                    duration: animationSpeed * 0.6,
                    easing: Easing.inOut(Easing.ease)
                }
            ),
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
        padding: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerButton: {
        padding: 10,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#2667df',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2667df',
        textAlign: 'center',
    },
    content: {
        marginBottom: 20,
    },
    inputSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    inputWrapper: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#2667df',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    sortButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    visualizationArea: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },
    item: {
        position: 'absolute',
        width: '8%',
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        bottom: 0,
    },
    itemText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
