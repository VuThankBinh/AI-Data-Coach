import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Animated, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API } from '../constants/API';

const { width } = Dimensions.get('window');

const SelectAnimation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonId } = route.params;

  const [lessonData, setLessonData] = useState(null);
  const [codeExercise, setCodeExercise] = useState(null);
  const [selectQuery, setSelectQuery] = useState('SELECT * FROM nhanvien');
  const [sampleData, setSampleData] = useState([
    { id: 1, ho: 'Nguyễn', ten: 'Văn A', tuoi: 30, chucvu: 'Quản lý', luong: 15000000 },
    { id: 2, ho: 'Trần', ten: 'Thị B', tuoi: 25, chucvu: 'Nhân viên', luong: 8000000 },
    { id: 3, ho: 'Lê', ten: 'Văn C', tuoi: 35, chucvu: 'Kỹ sư', luong: 12000000 },
    { id: 4, ho: 'Phạm', ten: 'Thị D', tuoi: 28, chucvu: 'Kế toán', luong: 10000000 },
    { id: 5, ho: 'Hoàng', ten: 'Văn E', tuoi: 40, chucvu: 'Giám đốc', luong: 25000000 },
  ]);
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedFields, setAnimatedFields] = useState([]);
  const [error, setError] = useState(null);
  const [delayBetweenColumns, setDelayBetweenColumns] = useState('1000');

  const columns = ['id', 'ho', 'ten', 'tuoi', 'chucvu', 'luong'];

  const animatedValues = useRef(
    columns.reduce((acc, column) => {
      acc[column] = new Animated.Value(0);
      return acc;
    }, {})
  ).current;

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

  const handlePractice = () => {
    if (codeExercise) {
      navigation.navigate('Practice', {
        algorithm: 'SelectAnimation',
        exercise: codeExercise[0]
      });
    } else {
      Alert.alert('Thông báo', 'Dữ liệu bài tập chưa sẵn sàng. Vui lòng thử lại sau.');
    }
  };

  const handleQueryChange = (text) => {
    setSelectQuery(text);
    setError(null);
  };

  const handleDelayChange = (text) => {
    setDelayBetweenColumns(text);
  };

  const executeSelect = () => {
    const fields = parseSelectQuery(selectQuery);
    if (fields.length === 0) {
      setError('Câu lệnh SELECT không hợp lệ. Vui lòng kiểm tra lại.');
      Alert.alert('Lỗi', 'Câu lệnh SELECT không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    setIsAnimating(true);
    setResult(null);
    setAnimatedFields([]);
    setError(null);

    // Đặt lại tất cả các giá trị animated về 0
    Object.values(animatedValues).forEach(av => av.setValue(0));

    const delay = parseInt(delayBetweenColumns, 10);
    const animationDuration = delay / 2; // Chia đôi thời gian delay cho animation highlight

    // Tạo chuỗi animation cho từng trường được chọn
    const animations = fields.map((field, index) => 
      Animated.sequence([
        Animated.timing(animatedValues[field], { toValue: 1, duration: animationDuration, useNativeDriver: false }),
        Animated.timing(animatedValues[field], { toValue: 0, duration: animationDuration, useNativeDriver: false }),
      ])
    );

    // Cập nhật animation để sử dụng delay mới
    Animated.stagger(delay, animations).start(() => {
      setIsAnimating(false);
    });

    // Cập nhật thời gian chờ cho mỗi cột
    fields.forEach((field, index) => {
      setTimeout(() => {
        setResult(prevResult => {
          const newResult = prevResult ? [...prevResult] : [];
          sampleData.forEach((item, dataIndex) => {
            if (!newResult[dataIndex]) {
              newResult[dataIndex] = {};
            }
            newResult[dataIndex][field] = item[field];
          });
          return newResult;
        });
        setAnimatedFields(prev => [...prev, field]);
      }, delay * (index + 1));
    });
  };

  const parseSelectQuery = (query) => {
    const match = query.match(/SELECT\s+(.+)\s+FROM\s+nhanvien/i);
    if (match) {
      const fieldsString = match[1];
      if (fieldsString === '*') {
        return columns;
      }
      const selectedFields = fieldsString.split(',').map(field => field.trim());
      // Kiểm tra xem các trường được chọn có hợp lệ không
      if (selectedFields.every(field => columns.includes(field))) {
        return selectedFields;
      }
    }
    return [];
  };

  const AnimatedCell = ({ field, value }) => (
    <Animated.View style={[
      styles.tableCell,
      {
        backgroundColor: animatedValues[field].interpolate({
          inputRange: [0, 1],
          outputRange: ['white', '#4CAF50']
        })
      }
    ]}>
      <Text style={styles.cellText}>{value}</Text>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {lessonData ? lessonData.name : 'Câu lệnh SELECT'}
        </Text>
        <TouchableOpacity onPress={handlePractice} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Thực hành</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          value={selectQuery}
          onChangeText={handleQueryChange}
          placeholder="Nhập câu lệnh SELECT (vd: SELECT ho, ten, tuoi FROM nhanvien)"
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={executeSelect} disabled={isAnimating}>
          <Text style={styles.buttonText}>Thực hiện</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.delayInputSection}>
        <Text>Thời gian giữa các cột (ms):</Text>
        <TextInput
          style={styles.delayInput}
          value={delayBetweenColumns}
          onChangeText={handleDelayChange}
          keyboardType="numeric"
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.dataSection}>
        <Text style={styles.sectionTitle}>Dữ liệu mẫu:</Text>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {columns.map(column => (
                <View key={column} style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>{column}</Text>
                </View>
              ))}
            </View>
            {sampleData.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                {columns.map(column => (
                  <AnimatedCell key={column} field={column} value={item[column]} />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {result && (
        <View style={styles.dataSection}>
          <Text style={styles.sectionTitle}>Kết quả:</Text>
          <ScrollView horizontal>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                {animatedFields.map(field => (
                  <View key={field} style={styles.tableHeader}>
                    <Text style={styles.headerText}>{field}</Text>
                  </View>
                ))}
              </View>
              {result.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  {animatedFields.map(field => (
                    <AnimatedCell key={field} field={field} value={item[field]} />
                  ))}
                </View>
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
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
  // Thêm style riêng cho header của bảng
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SelectAnimation;
