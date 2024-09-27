import LoginMain from "../components/Web/Login/LoginMain";
import LoginEmailComponent from "../components/Web/Login/LoginEmailComponent";
import MobileLoginEmailComponent from "../components/Mobile/Login/LoginEmailComponent";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
export default function Login() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'web') {
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
    return (
        <>
            {isMobile ? (
                <MobileLoginEmailComponent />
            ) : (
                <LoginMain>
                    <LoginEmailComponent />
                </LoginMain>
            )}
        </>
    );
}