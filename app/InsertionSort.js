import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useDerivedValue, Easing } from "react-native-reanimated";
import { useNavigation } from '@react-navigation/native';

export default function InsertionSort() {
    const navigation = useNavigation();
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
    const activeIndex = useSharedValue(-1);
    const insertingIndex = useSharedValue(-1);
    const isSorting = useRef(false);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const positions = useSharedValue(items.map((_, index) => index));

    useEffect(() => {
        console.log("Các phần tử hiện tại trên giao diện:");
        items.forEach((item, index) => {
            console.log(`  Index ${index}: Giá trị ${item.value}, Vị trí ${positions.value[index]}`);
        });
    }, [items, positions.value]);

    const insertionSort = async () => {
        const arr = [...items];
        const n = arr.length;
        const speed = parseInt(animationSpeed, 10);
        let newPositions = arr.map((_, index) => index);

        console.log("Bắt đầu sắp xếp:");
        console.log("Mảng ban đầu:", arr.map(item => item.value));

        for (let i = 1; i < n; i++) {
            console.log(`\nVòng lặp ngoài: i = ${i}`);
            activeIndex.value = i;
            console.log(`Đặt activeIndex = ${i}`);
            await sleep(speed);

            let currentElement = arr[i];
            let j = i - 1;

            console.log(`Phần tử đang xét: ${currentElement.value}`);

            while (j >= 0 && arr[j].value > currentElement.value) {
                console.log(`  So sánh ${currentElement.value} < ${arr[j].value}`);
                
                // Highlight phần tử đang so sánh trong phần đã sắp xếp
                insertingIndex.value = newPositions.indexOf(j);
                console.log(`Đặt insertingIndex = ${insertingIndex.value} (vị trí thực tế: ${j}, giá trị: ${arr[j].value})`);
                await sleep(speed);

                arr[j + 1] = arr[j];
                newPositions[arr[j].id - 1] = j + 1;
                
                positions.value = [...newPositions];
                console.log(`  Positions sau khi di chuyển:`, positions.value);
                
                await sleep(speed);
                j--;
            }

            arr[j + 1] = currentElement;
            newPositions[currentElement.id - 1] = j + 1;

            positions.value = [...newPositions];
            console.log(`  Chèn ${currentElement.value} vào vị trí ${j + 1}`);
            console.log(`  Positions sau khi chèn:`, positions.value);

            // Highlight vị trí cuối cùng của phần tử được chèn
            insertingIndex.value = newPositions.indexOf(j + 1);
            console.log(`Đặt insertingIndex = ${insertingIndex.value} (vị trí thực tế: ${j + 1})`);
            await sleep(speed);

            console.log(`Kết thúc vòng lặp cho i = ${i}`);
            console.log(`Mảng hiện tại:`, arr.map(item => item.value));

            activeIndex.value = -1;
            insertingIndex.value = -1;
            console.log(`Đặt lại activeIndex và insertingIndex`);
            await sleep(speed / 2);
        }

        console.log("\nKết thúc sắp xếp:");
        console.log("Mảng cuối cùng:", arr.map(item => item.value));
        console.log("Positions cuối cùng:", positions.value);

        isSorting.current = false;
    };

    const handleSort = () => {
        if (isSorting.current) return;
        isSorting.current = true;
        insertionSort();
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
        positions.value = newArray.map((_, index) => index); // Cập nhật positions
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Quay lại</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Thuật toán Insertion Sort</Text>
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
                    <InsertionSortItem
                        key={item.id}
                        item={item}
                        index={index}
                        totalItems={items.length}
                        activeIndex={activeIndex}
                        insertingIndex={insertingIndex}
                        positions={positions}
                        animationSpeed={parseInt(animationSpeed, 10)}
                    />
                ))}
            </View>
        </View>
    );
};

function InsertionSortItem({ item, index, totalItems, activeIndex, insertingIndex, positions, animationSpeed }) {
    const isActive = useDerivedValue(() => {
        const active = activeIndex.value === index;
        if (active) {
            console.log(`Phần tử đang active (đỏ): index ${index}, giá trị ${item.value}`);
        }
        return active;
    });

    const isInserting = useDerivedValue(() => {
        const inserting = insertingIndex.value === index;
        if (inserting) {
            console.log(`Phần tử đang inserting (vàng): index ${index}, giá trị ${item.value}`);
        }
        return inserting;
    });

    const position = useDerivedValue(() => {
        return positions.value[index];
    });

    const animatedStyle = useAnimatedStyle(() => {
        const targetPosition = (position.value / (totalItems - 1)) * 92;

        const backgroundColor = isActive.value ? 'red' : isInserting.value ? 'yellow' : 'blue';

        return {
            height: item.value * 4,
            transform: [{
                translateX: withTiming(targetPosition * (Dimensions.get('window').width - 40) / 100, {
                    duration: animationSpeed
                })
            }],
            backgroundColor: withTiming(backgroundColor, {
                duration: animationSpeed * 0.6,
                easing: Easing.inOut(Easing.ease)
            }),
            zIndex: isActive.value ? 2 : isInserting.value ? 1 : 0,
        };
    });

    useEffect(() => {
        console.log(`Render InsertionSortItem: index ${index}, giá trị ${item.value}, isActive: ${isActive.value}, isInserting: ${isInserting.value}`);
    }, [index, item.value, isActive.value, isInserting.value]);

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
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#2667df',
    },
    headerText: {
        flex: 1,
        fontSize: 24,
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
