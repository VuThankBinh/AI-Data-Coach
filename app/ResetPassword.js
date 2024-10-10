import LoginMain from "../components/Web/Login/LoginMain";
import ResetPasswordComponent from "../components/Web/Login/ResetPasswordComponent";
import MobileResetPasswordComponent from "../components/Mobile/Login/ResetPasswordComponent";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
export default function ResetPassword() {
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
                <MobileResetPasswordComponent />
            ) : (
                <LoginMain>
                    <ResetPasswordComponent />
                </LoginMain>
            )}
        </>
    );
}