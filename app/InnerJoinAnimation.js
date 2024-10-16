import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Animated, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API } from '../constants/API';

const { width } = Dimensions.get('window');

const InnerJoinAnimation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { lessonId } = route.params;

    const [lessonData, setLessonData] = useState(null);
    const [codeExercise, setCodeExercise] = useState(null);
    const [joinQuery, setJoinQuery] = useState('SELECT * FROM nhanvien INNER JOIN phongban ON nhanvien.maphong = phongban.maphong');
    const [nhanvienData, setNhanvienData] = useState([
        { id: 1, ho: 'Nguyễn', ten: 'Văn A', tuoi: 30, maphong: 'P001' },
        { id: 2, ho: 'Trần', ten: 'Thị B', tuoi: 25, maphong: 'P002' },
        { id: 3, ho: 'Lê', ten: 'Văn C', tuoi: 35, maphong: 'P001' },
        { id: 4, ho: 'Phạm', ten: 'Thị D', tuoi: 28, maphong: 'P003' },
        { id: 5, ho: 'Hoàng', ten: 'Văn E', tuoi: 40, maphong: 'P002' },
    ]);
    const [phongbanData, setPhongbanData] = useState([
        { maphong: 'P001', tenphong: 'Kế toán' },
        { maphong: 'P002', tenphong: 'Nhân sự' },
        { maphong: 'P003', tenphong: 'Kỹ thuật' },
    ]);
    const [result, setResult] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(null);
    const [delayBetweenRows, setDelayBetweenRows] = useState('1000');

    const nhanvienColumns = ['id', 'ho', 'ten', 'tuoi', 'maphong'];
    const phongbanColumns = ['maphong', 'tenphong'];

    const nhanvienAnimatedValues = useRef(nhanvienData.map(() => new Animated.Value(0))).current;
    const phongbanAnimatedValues = useRef(phongbanData.map(() => new Animated.Value(0))).current;
    const resultAnimatedValues = useRef([]).current;

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

    const handleQueryChange = (text) => {
        setJoinQuery(text);
        setError(null);
    };

    const handleDelayChange = (text) => {
        setDelayBetweenRows(text);
    };

    const executeJoin = () => {
        const parsedQuery = parseJoinQuery(joinQuery);
        if (!parsedQuery) {
            setError('Câu lệnh INNER JOIN không hợp lệ. Vui lòng kiểm tra lại.');
            Alert.alert('Lỗi', 'Câu lệnh INNER JOIN không hợp lệ. Vui lòng kiểm tra lại.');
            return;
        }

        setIsAnimating(true);
        setResult(null);
        setError(null);

        const delay = parseInt(delayBetweenRows, 10);
        const duration = 500;

        nhanvienAnimatedValues.forEach(av => av.setValue(0));
        phongbanAnimatedValues.forEach(av => av.setValue(0));
        resultAnimatedValues.length = 0;

        const joinResult = [];
        const animations = [];

        nhanvienData.forEach((nv, nvIndex) => {
            phongbanData.forEach((pb, pbIndex) => {
                if (nv.maphong === pb.maphong) {
                    const resultItem = { ...nv, tenphong: pb.tenphong };
                    joinResult.push(resultItem);
                    const resultIndex = joinResult.length - 1;
                    resultAnimatedValues[resultIndex] = new Animated.Value(0);

                    animations.push(
                        Animated.sequence([
                            Animated.timing(nhanvienAnimatedValues[nvIndex], { toValue: 1, duration, useNativeDriver: false }),
                            Animated.timing(phongbanAnimatedValues[pbIndex], { toValue: 1, duration, useNativeDriver: false }),
                            Animated.timing(resultAnimatedValues[resultIndex], { toValue: 1, duration, useNativeDriver: false }),
                            Animated.parallel([
                                Animated.timing(nhanvienAnimatedValues[nvIndex], { toValue: 0, duration, useNativeDriver: false }),
                                Animated.timing(phongbanAnimatedValues[pbIndex], { toValue: 0, duration, useNativeDriver: false }),
                            ]),
                        ])
                    );
                }
            });
        });

        Animated.stagger(delay, animations).start(() => {
            setIsAnimating(false);
            setResult(joinResult);
        });
    };

    const parseJoinQuery = (query) => {
        const regex = /SELECT\s+(.+)\s+FROM\s+nhanvien\s+INNER JOIN\s+phongban\s+ON\s+nhanvien\.maphong\s*=\s*phongban\.maphong/i;
        const match = query.match(regex);
        if (match) {
            return true;
        }
        return false;
    };

    const AnimatedNhanvienRow = ({ item, index }) => {
        const animatedStyle = {
            backgroundColor: nhanvienAnimatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: ['white', '#FFF9C4']
            })
        };

        return (
            <Animated.View style={[styles.tableRow, animatedStyle]}>
                {nhanvienColumns.map(column => (
                    <View key={column} style={styles.tableCell}>
                        <Text style={styles.cellText}>{item[column]}</Text>
                    </View>
                ))}
            </Animated.View>
        );
    };

    const AnimatedPhongbanRow = ({ item, index }) => {
        const animatedStyle = {
            backgroundColor: phongbanAnimatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: ['white', '#FFF9C4']
            })
        };

        return (
            <Animated.View style={[styles.tableRow, animatedStyle]}>
                {phongbanColumns.map(column => (
                    <View key={column} style={styles.tableCell}>
                        <Text style={styles.cellText}>{item[column]}</Text>
                    </View>
                ))}
            </Animated.View>
        );
    };

    const AnimatedResultRow = ({ item, index }) => {
        const animatedStyle = {
            backgroundColor: resultAnimatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: ['white', '#E8F5E9']
            })
        };

        return (
            <Animated.View style={[styles.tableRow, animatedStyle]}>
                {[...nhanvienColumns, 'tenphong'].map(column => (
                    <View key={column} style={styles.tableCell}>
                        <Text style={styles.cellText}>{item[column]}</Text>
                    </View>
                ))}
            </Animated.View>
        );
    };

    const handlePractice = () => {
        if (codeExercise) {
            navigation.navigate('Practice', {
                algorithm: 'InnerJoinAnimation',
                exercise: codeExercise[0]
            });
        } else {
            Alert.alert('Thông báo', 'Dữ liệu bài tập chưa sẵn sàng. Vui lòng thử lại sau.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>← Quay lại</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {lessonData ? lessonData.name : 'INNER JOIN'}
                </Text>
                <TouchableOpacity onPress={handlePractice} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Thực hành</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    value={joinQuery}
                    onChangeText={handleQueryChange}
                    placeholder="Nhập câu lệnh INNER JOIN"
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={executeJoin} disabled={isAnimating}>
                    <Text style={styles.buttonText}>Thực hiện</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.delayInputSection}>
                <Text>Thời gian giữa các hàng (ms):</Text>
                <TextInput
                    style={styles.delayInput}
                    value={delayBetweenRows}
                    onChangeText={handleDelayChange}
                    keyboardType="numeric"
                />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.tablesContainer}>
                <View style={styles.dataSection}>
                    <Text style={styles.sectionTitle}>Dữ liệu nhân viên:</Text>
                    <ScrollView horizontal>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                {nhanvienColumns.map(column => (
                                    <View key={column} style={styles.tableHeader}>
                                        <Text style={styles.tableHeaderText}>{column}</Text>
                                    </View>
                                ))}
                            </View>
                            {nhanvienData.map((item, index) => (
                                <AnimatedNhanvienRow key={item.id} item={item} index={index} />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.dataSection}>
                    <Text style={styles.sectionTitle}>Dữ liệu phòng ban:</Text>
                    <ScrollView horizontal>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                {phongbanColumns.map(column => (
                                    <View key={column} style={styles.tableHeader}>
                                        <Text style={styles.tableHeaderText}>{column}</Text>
                                    </View>
                                ))}
                            </View>
                            {phongbanData.map((item, index) => (
                                <AnimatedPhongbanRow key={item.maphong} item={item} index={index} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>

            {result && (
                <View style={styles.dataSection}>
                    <Text style={styles.sectionTitle}>Kết quả INNER JOIN:</Text>
                    <ScrollView horizontal>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                {[...nhanvienColumns, 'tenphong'].map(column => (
                                    <View key={column} style={styles.tableHeader}>
                                        <Text style={styles.tableHeaderText}>{column}</Text>
                                    </View>
                                ))}
                            </View>
                            {result.map((item, index) => (
                                <AnimatedResultRow key={item.id} item={item} index={index} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        width: '70%',
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    button: {
        width: '20%',
        height: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    dataSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    sampleTable: {
        borderWidth: 1,
        borderColor: 'gray',
        width: width - 40,
    },
    table: {
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'column',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    tableHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: 'white',
        minWidth: 100,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2667df',
        textAlign: 'center',
    },
    tableCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: 'gray',
        minWidth: 100,
    },
    cellText: {
        fontSize: 14,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    delayInputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    delayInput: {
        width: 100,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    tablesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default InnerJoinAnimation;
