import { useNavigation } from "@react-navigation/native";
import CourseMain from "../components/Web/Course/CourseMain";
import { View } from "react-native";
export default function Course() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <CourseMain />
    </View>
  );
}
