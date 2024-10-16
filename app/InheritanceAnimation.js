import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API } from '../constants/API';

const { width, height } = Dimensions.get('window');

const InheritanceAnimation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { lessonId } = route.params;

    const [lessonData, setLessonData] = useState(null);
    const [codeExercise, setCodeExercise] = useState(null);

    const [step, setStep] = useState(0);

    const parentClassOpacity = useSharedValue(1);
    const childClassOpacity = useSharedValue(0);
    const inheritanceLineOpacity = useSharedValue(0);
    const inheritedPropertiesOpacity = useSharedValue(0);
    const ownPropertiesOpacity = useSharedValue(0);
    const overriddenMethodOpacity = useSharedValue(0);

    const parentClassStyle = useAnimatedStyle(() => ({
        opacity: parentClassOpacity.value,
        transform: [{ scale: parentClassOpacity.value }],
    }));

    const childClassStyle = useAnimatedStyle(() => ({
        opacity: childClassOpacity.value,
        transform: [{ translateY: withSpring((1 - childClassOpacity.value) * 50) }],
    }));

    const inheritanceLineStyle = useAnimatedStyle(() => ({
        opacity: inheritanceLineOpacity.value,
        height: withSpring(inheritanceLineOpacity.value * 50),
    }));

    const inheritedPropertiesStyle = useAnimatedStyle(() => ({
        opacity: inheritedPropertiesOpacity.value,
    }));

    const ownPropertiesStyle = useAnimatedStyle(() => ({
        opacity: ownPropertiesOpacity.value,
    }));

    const overriddenMethodStyle = useAnimatedStyle(() => ({
        opacity: overriddenMethodOpacity.value,
    }));

    const steps = [
        {
            title: 'Lớp cha (Vehicle)',
            content: 'Định nghĩa lớp cơ sở với các thuộc tính và phương thức chung.'
        },
        {
            title: 'Lớp con (Car)',
            content: 'Tạo lớp con kế thừa từ lớp cha, sử dụng từ khóa "extends".'
        },
        {
            title: 'Kế thừa thuộc tính',
            content: 'Lớp con tự động kế thừa các thuộc tính từ lớp cha.'
        },
        {
            title: 'Thuộc tính riêng',
            content: 'Lớp con có thể định nghĩa các thuộc tính riêng của mình.'
        },
        {
            title: 'Ghi đè phương thức',
            content: 'Lớp con có thể định nghĩa lại (override) các phương thức của lớp cha.'
        }
    ];

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

    const nextStep = () => {
        setStep((prevStep) => {
            const newStep = (prevStep + 1) % steps.length;
            switch (newStep) {
                case 0:
                    parentClassOpacity.value = withTiming(1);
                    childClassOpacity.value = withTiming(0);
                    inheritanceLineOpacity.value = withTiming(0);
                    inheritedPropertiesOpacity.value = withTiming(0);
                    ownPropertiesOpacity.value = withTiming(0);
                    overriddenMethodOpacity.value = withTiming(0);
                    break;
                case 1:
                    childClassOpacity.value = withTiming(1);
                    inheritanceLineOpacity.value = withTiming(1);
                    break;
                case 2:
                    inheritedPropertiesOpacity.value = withTiming(1);
                    break;
                case 3:
                    ownPropertiesOpacity.value = withTiming(1);
                    break;
                case 4:
                    overriddenMethodOpacity.value = withTiming(1);
                    break;
            }
            return newStep;
        });
    };

    const handlePractice = () => {
        if (codeExercise) {
            navigation.navigate('Practice', {
                algorithm: 'InheritanceAnimation',
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
                    {lessonData ? lessonData.name : 'Tính kế thừa trong OOP'}
                </Text>
                <TouchableOpacity onPress={handlePractice} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Thực hành</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Tính kế thừa trong OOP</Text>

            <View style={styles.diagramContainer}>
                <Animated.View style={[styles.classBox, parentClassStyle]}>
                    <Text style={styles.className}>Vehicle</Text>
                    <View style={styles.classDivider} />
                    <Text style={styles.classContent}>+ brand: string</Text>
                    <View style={styles.classDivider} />
                    <Text style={styles.classContent}>+ start(): void</Text>
                </Animated.View>

                <Animated.View style={[styles.inheritanceLine, inheritanceLineStyle]} />

                <Animated.View style={[styles.classBox, childClassStyle]}>
                    <Text style={styles.className}>Car</Text>
                    <View style={styles.classDivider} />
                    <Animated.Text style={[styles.classContent, inheritedPropertiesStyle]}>+ brand: string</Animated.Text>
                    <Animated.Text style={[styles.classContent, ownPropertiesStyle]}>+ model: string</Animated.Text>
                    <View style={styles.classDivider} />
                    <Animated.Text style={[styles.classContent, overriddenMethodStyle]}>+ start(): void</Animated.Text>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.02,
    },
    diagramContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    classBox: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#333',
        width: width * 0.4,
        padding: 10,
    },
    className: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    classDivider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 5,
    },
    classContent: {
        fontSize: 14,
        marginLeft: 10,
    },
    inheritanceLine: {
        width: 2,
        backgroundColor: '#333',
        marginVertical: 10,
    },
    stepDescription: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: height * 0.02,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    stepContent: {
        fontSize: 14,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
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
});

export default InheritanceAnimation;
