import LoginMain from "../components/Web/Login/LoginMain";
import ForgetPassword from "../components/Web/Login/ForgetPassword";
import MobileForgetPassword from "../components/Mobile/Login/ForgetPassword";
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
                <MobileForgetPassword />
            ) : (
                <LoginMain>
                    <ForgetPassword />
                </LoginMain>
            )}
        </>
    );
}