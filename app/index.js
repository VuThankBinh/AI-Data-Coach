import { Platform } from 'react-native';
import LoginMain from "../components/Web/Login/LoginMain";
import LoginComponent from "../components/Web/Login/LoginComponent";
import MobileLoginComponent from "../components/Mobile/Login/LoginComponent";
import { useEffect, useState } from "react";

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
                <MobileLoginComponent />
            ) : (
                <LoginMain>
                    <LoginComponent />
                </LoginMain>
            )}
        </>
    );
}