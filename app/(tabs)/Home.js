import { Platform } from "react-native";
import LoginMain from "../../components/Web/Login/LoginMain";
import HomeComponent from "../../components/Web/Home/HomeComponent";
import MobileHomeComponent from "../../components/Mobile/Home/HomeComponent";
import { useEffect, useState } from "react";

export default function Home() {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋",
    });
  };
  showToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

  return <>{isMobile ? <MobileHomeComponent /> : <HomeComponent />}</>;
}
