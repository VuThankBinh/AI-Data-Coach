import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { API } from '../constants/API';
import { useRoute, useNavigation } from '@react-navigation/native';
export default function App() {
  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const route = useRoute();

  useEffect(() => {
    fetchLesson();
  }, []);
  const { lessonId } = route.params;
  const fetchLesson = async () => {
    try {
      const response = await fetch(`${API.API_URL}/lessons/${lessonId}/quizz-exercises`);
      const data = await response.json();
      setLesson(data);
      const formattedQuestions = data
        .filter(exercise => exercise.type === 'single' || exercise.type === 'multiple')
        .map((q, index) => ({
          ...q,
          index, // Thêm index vào mỗi câu hỏi
          userAnswer: [], // Khởi tạo câu trả lời của người dùng là mảng rỗng
          correctAnswer: q.correctAnswer.map(Number) // Chuyển đổi correctAnswer thành mảng số
        }));
      console.log('Formatted Questions:', formattedQuestions);
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Lỗi khi tải bài học:', error);
    }
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    if (submitted) return;
    setQuestions(prevQuestions => {
      return prevQuestions.map((q, index) => {
        if (index === questionIndex) {
          if (q.type === 'single') {
            return { ...q, userAnswer: [optionIndex] };
          } else {
            let newAnswer = [...q.userAnswer];
            if (newAnswer.includes(optionIndex)) {
              newAnswer = newAnswer.filter(a => a !== optionIndex);
            } else {
              newAnswer.push(optionIndex);
            }
            return { ...q, userAnswer: newAnswer.sort((a, b) => a - b) };
          }
        }
        return q;
      });
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    const updatedQuestions = questions.map(q => {
      const isCorrect = JSON.stringify(q.userAnswer.sort()) === JSON.stringify(q.correctAnswer.sort());
      if (isCorrect) correctAnswers++;
      return { ...q, isCorrect };
    });
    setQuestions(updatedQuestions);
    setScore(`${correctAnswers}/${questions.length}`);
    setSubmitted(true);
    alert(
      "Kết quả",
      `Bạn đã trả lời đúng ${correctAnswers}/${questions.length} câu hỏi.`
    );
  };

  const getOptionStyle = (question, optionIndex) => {
    if (!submitted) return styles.option;
    if (question.correctAnswer.includes(optionIndex)) {
      return [styles.option, styles.correctOption];
    }
    if (question.userAnswer.includes(optionIndex) && !question.isCorrect) {
      return [styles.option, styles.incorrectOption];
    }
    return styles.option;
  };

  if (!lesson) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lesson.name}</Text>
      <Text style={styles.theory}>{lesson.theory}</Text>
      {questions.map((q, qIndex) => (
        <View key={qIndex} style={styles.questionContainer}>
          <Text style={styles.question}>{`${qIndex + 1}. ${q.question}`}</Text>
          <Text style={styles.questionType}>
            {q.type === 'single' ? '(Chọn một đáp án)' : '(Chọn nhiều đáp án)'}
          </Text>
          {q.options.map((option, index) => (
            <CheckBox
              key={index}
              title={option}
              checked={q.userAnswer.includes(index)}
              onPress={() => handleOptionSelect(qIndex, index)}
              checkedIcon={q.type === 'single' ? 'dot-circle-o' : 'check-square-o'}
              uncheckedIcon={q.type === 'single' ? 'circle-o' : 'square-o'}
              containerStyle={getOptionStyle(q, index)}
              disabled={submitted}
            />
          ))}
          <Text style={styles.debug}>{`Debug - User Answer: ${JSON.stringify(q.userAnswer)}`}</Text>
          <Text style={styles.debug}>{`Debug - Correct Answer: ${JSON.stringify(q.correctAnswer)}`}</Text>
        </View>
      ))}
      {!submitted && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Hoàn thành</Text>
        </TouchableOpacity>
      )}
      {score !== null && (
        <Text style={styles.scoreText}>Điểm số của bạn: {score}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  theory: {
    fontSize: 16,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
  },
  correctOption: {
    borderColor: 'green',
    borderWidth: 2,
  },
  incorrectOption: {
    borderColor: 'red',
    borderWidth: 2,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  explanationButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  explanationButtonText: {
    textAlign: 'center',
    color: '#007AFF',
  },
  explanation: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    fontStyle: 'italic',
  },
  questionType: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#666',
  },
  debug: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
});