import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { theme } from "../constants/theme";

export default LessonHeader = ({ lessonData }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerButton}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{lessonData ? lessonData.name : ""}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("quizz", { lessonId: lessonData._id });
        }}
        style={styles.headerRightButton}
      >
        <Ionicons name="book" size={24} color="black" />
        <Text style={styles.headerButtonText}>Câu hỏi ôn tập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.statusBar,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  headerButton: {
    padding: 10,
  },
  headerRightButton: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginRight: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
  },
  headerButtonText: {
    fontSize: 18,
    color: "#000",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
