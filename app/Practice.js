import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Animated, Modal } from 'react-native';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, Picker } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { API } from '../constants/API';

export default function Practice() {
    const navigation = useNavigation();
    const route = useRoute();
    const { exercise } = route.params;

    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [language, setLanguage] = useState('python');
    const [isExerciseVisible, setIsExerciseVisible] = useState(true);
    const exerciseHeight = useState(new Animated.Value(1))[0];
    const [isCorrect, setIsCorrect] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    
    useEffect(() => {
        if (exercise) {
            setLanguage(exercise.defaultLanguage || 'python');
        }
    }, [exercise]);

    const executeCode = async () => {
        try {
            var jdoodleConfig = {
                'python': { language: 'python3', versionIndex: "3" },
                'javascript': { language: 'nodejs', versionIndex: "3" },
                'java': { language: 'java', versionIndex: "3" },
                'sql': { language: 'sql', versionIndex: "3" },
                'csharp': { language: 'csharp', versionIndex: "3" },
                'cpp': { language: 'cpp', versionIndex: "4" }
            };

            var selectedConfig = jdoodleConfig[language];
            const response = await fetch(`${API.API_URL}/combined/execute`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    script: code,
                    language: selectedConfig.language,
                    versionIndex: selectedConfig.versionIndex,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setOutput(`Lỗi: ${data.error}`);
                setIsCorrect(false);
            } else {
                setOutput(data.output);
                // Kiểm tra kết quả
                checkResult(data.output);
            }
        } catch (error) {
            console.error('Lỗi:', error);
            setOutput('Đã xảy ra lỗi khi thực thi mã');
            setIsCorrect(false);
        }
    };

    const checkResult = (result) => {
        // Loại bỏ khoảng trắng và xuống dòng để so sánh chính xác
        const cleanResult = result.trim().replace(/\s+/g, '');
        const cleanExpected = exercise.output.trim().replace(/\s+/g, '');
        setIsCorrect(cleanResult === cleanExpected);
    };

    const handleSubmit = () => {
        setModalMessage("Bạn có chắc chắn muốn nộp bài không?");
        setIsModalVisible(true);
    };

    const confirmSubmit = () => {
        setIsModalVisible(false);
        setModalMessage("Bạn đã hoàn thành bài tập!");
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        if (modalMessage === "Bạn đã hoàn thành bài tập!") {
            navigation.navigate('Courses');
        }
    };

    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === 'Enter') {
            sendMessage();
        }
    };
    const sendMessage = async () => {
        if (chatInput.trim()) {
            const userMessage = { text: chatInput, user: true };
            setChatMessages(prevMessages => [...prevMessages, userMessage]);
            setChatInput('');

            try {
                let message = '';
                if (code == '') {
                    message = "bạn hãy trả lời bằng tiếng việt: " + chatInput;
                }
                else {
                    message = "bạn hãy trả lời bằng tiếng việt: " + chatInput + "code: " + code + ", output: " + output + ", language: " + language
                }
                console.log(message);

                const response = await fetch(`${API.API_URL}/combined/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            message: message
                        }),
                });

                const data = await response.json();
                console.log(data);
                if (data.error) {
                    setChatMessages(prevMessages => [...prevMessages, { text: `Lỗi: ${data.error}`, user: false }]);
                } else {
                    setChatMessages(prevMessages => [...prevMessages, { text: data.reply, user: false }]);
                }
            } catch (error) {
                console.error('Lỗi:', error);
                setChatMessages(prevMessages => [...prevMessages, { text: 'Đã xảy ra lỗi khi gửi tin nhắn', user: false }]);
            }
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const toggleExerciseVisibility = () => {
        setIsExerciseVisible(!isExerciseVisible);
        Animated.timing(exerciseHeight, {
            toValue: isExerciseVisible ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thực hành</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.leftContainer}>
                    <View style={styles.exerciseHeader}>
                        <Text style={styles.exerciseHeaderText}>Đề bài</Text>
                        <TouchableOpacity onPress={toggleExerciseVisibility}>
                            <Text style={styles.toggleButton}>
                                {isExerciseVisible ? 'Ẩn' : 'Hiện'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={[
                        styles.exerciseContainer,
                        {
                            maxHeight: exerciseHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                            }),
                            opacity: exerciseHeight
                        }
                    ]}>
                        <ScrollView>
                            <Text style={styles.exerciseTitle}>Đề bài:</Text>
                            <Text style={styles.exerciseText}>{exercise.question}</Text>
                            <Text style={styles.exerciseTitle}>Input:</Text>
                            <Text style={styles.exerciseText}>{exercise.input}</Text>
                            <Text style={styles.exerciseTitle}>Output mong đợi:</Text>
                            <Text style={styles.exerciseText}>{exercise.output}</Text>
                        </ScrollView>
                    </Animated.View>
                    <View style={styles.codeContainer}>
                        <View style={styles.languageSelector}>
                            <Text>Chọn ngôn ngữ: </Text>
                            <Picker
                                selectedValue={language}
                                style={styles.picker}
                                onValueChange={(itemValue) => setLanguage(itemValue)}
                            >
                                <Picker.Item label="Python" value="python" />
                                <Picker.Item label="JavaScript" value="javascript" />
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="C++" value="cpp" />
                                <Picker.Item label="C#" value="csharp" />
                            </Picker>
                        </View>
                        <TextInput
                            style={styles.codeInput}
                            multiline
                            numberOfLines={10}
                            onChangeText={setCode}
                            value={code}
                            placeholder={`Nhập mã ${language} của bạn ở đây...`}
                        />
                        <Button title="Thực thi" onPress={executeCode} />
                    </View>
                    <ScrollView style={styles.outputContainer}>
                        <Text style={styles.outputText}>{output}</Text>
                    </ScrollView>
                    {isCorrect && (
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Nộp bài</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.chatContainer}>
                    <ScrollView style={styles.chatMessages}>
                        {chatMessages.map((msg, index) => (
                            <Text key={index} style={msg.user ? styles.userMessage : styles.botMessage}>
                                {msg.text}
                            </Text>
                        ))}
                    </ScrollView>
                    <View style={styles.chatInputContainer}>
                        <TextInput
                            style={styles.chatInput}
                            value={chatInput}
                            onKeyPress={handleKeyPress}
                            onChangeText={setChatInput}
                            placeholder="Nhập tin nhắn..."
                        />
                        <Button title="Gửi" onPress={sendMessage} />
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        {modalMessage === "Bạn có chắc chắn muốn nộp bài không?" ? (
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonCancel]}
                                    onPress={closeModal}
                                >
                                    <Text style={styles.textStyle}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonConfirm]}
                                    onPress={confirmSubmit}
                                >
                                    <Text style={styles.textStyle}>Nộp bài</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={closeModal}
                            >
                                <Text style={styles.textStyle}>OK</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        color: '#4285F4',
        fontWeight: 'bold',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 2,
        padding: 10,
    },
    codeContainer: {
        flex: 2,
    },
    codeInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    outputContainer: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
    },
    outputText: {
        fontFamily: 'monospace',
    },
    chatContainer: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        padding: 10,
    },
    chatMessages: {
        flex: 1,
    },
    chatInputContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    chatInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        padding: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    languageSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 150,
    },
    exerciseContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    exerciseTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
    },
    exerciseText: {
        fontSize: 14,
        marginBottom: 10,
    },
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        height: 40,
    },
    exerciseHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleButton: {
        color: '#4285F4',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonCancel: {
        backgroundColor: "#F194FF",
    },
    buttonConfirm: {
        backgroundColor: "#2196F3",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
