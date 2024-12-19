import { Platform } from "react-native";
import HomeComponent from "../../components/Web/Home/HomeComponent";
import MobileCourseComponent from "../../components/Mobile/Lesson/CourseComponent";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Lessons() {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    if (Platform.OS === "web") {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    } else {
      setIsMobile(true);
    }
  }, []);

  return <>{isMobile ? <MobileCourseComponent /> : <HomeComponent />}</>;
}
