import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../components/Web/HeaderComponent';
import { API } from '../constants/API';

const CourseItem = ({ title, image, condition, source, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.courseItem}>
        <Image source={{ uri: image }} style={styles.courseImage} />
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseCondition}>{condition}</Text>
    </TouchableOpacity>
);

const SideMenu = ({ selectedSubject, onSubjectChange, subjects }) => (
    <View style={styles.sideMenu}>
        <Text style={styles.menuTitle}>Môn học bạn chọn</Text>
        <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue) => onSubjectChange(itemValue)}
            style={styles.picker}
        >
            {subjects.map((subject) => (
                <Picker.Item key={subject._id} label={subject.name} value={subject._id} />
            ))}
        </Picker>
        <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Lộ trình</Text>
        </TouchableOpacity>
    </View>
);

const RobotGreeting = () => (
    <View style={styles.robotGreeting}>
        <Image source={require('../assets/images/robot.png')} style={styles.robotImage} />
        <Text style={styles.robotText}>Xin chào, mình là AI AIC rất vui khi được hỗ trợ bạn. Nếu có thắc mắc gì hãy hỏi mình nhé!!!</Text>
    </View>
);

function Courses() {
    const navigation = useNavigation();
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(API.GET_COURSES);
                setSubjects(response.data);
                if (response.data.length > 0) {
                    setSelectedSubject(response.data[0]._id);
                }
                setLoading(false);
            } catch (err) {
                setError('Không thể tải danh sách môn học');
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    useEffect(() => {
        const fetchLessons = async () => {
            if (selectedSubject) {
                try {
                    setLoading(true);
                    const response = await axios.get(`${API.API_URL}/lessons/user/670e0383b6ca43ae252e4385/subject/${selectedSubject}`);
                    setLessons(response.data);
                    setLoading(false);
                } catch (err) {
                    setError('Không thể tải danh sách bài học');
                    setLoading(false);
                }
            }
        };

        fetchLessons();
    }, [selectedSubject]);

    const handleCoursePress = (source, lessonId) => {
        navigation.navigate(source, { lessonId: lessonId });
    };

    if (loading) {
        return <Text>Đang tải...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <HeaderComponent />
            <View style={styles.content}>
                <SideMenu
                    selectedSubject={selectedSubject}
                    onSubjectChange={setSelectedSubject}
                    subjects={subjects}
                />
                <View style={styles.mainContent}>
                    <Text style={styles.header}>Các bài học</Text>
                    {lessons.length > 0 ? (
                        <FlatList
                            data={lessons}
                            renderItem={({ item }) => (
                                <CourseItem
                                    title={item.name}
                                    image={item.image}
                                    condition={item.condition}
                                    source={item.source}
                                    onPress={() => handleCoursePress(item.source, item._id)}
                                />
                            )}
                            keyExtractor={item => item._id}
                            numColumns={3}
                        />
                    ) : (
                        <Text>Không có bài học nào cho môn học này.</Text>
                    )}
                    <RobotGreeting />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    sideMenu: {
        width: 200,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    menuItem: {
        padding: 10,
        marginTop: 10,
    },
    menuItemText: {
        fontSize: 16,
    },
    mainContent: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2667df',
    },
    courseItem: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    courseCondition: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        padding: 5,
    },
    robotGreeting: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e6f7ff',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    robotImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    robotText: {
        flex: 1,
        fontSize: 14,
    },
});

export default Courses;
