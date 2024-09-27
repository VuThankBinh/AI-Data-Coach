import LoginMain from "../components/Web/Login/LoginMain";
import VerifyOTPComponent from "../components/Web/Login/VerifyOTPComponent";
import MobileVerifyOTPComponent from "../components/Mobile/Login/VerifyOTPComponent";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
export default function VerifyOTP() {
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
                <MobileVerifyOTPComponent />
            ) : (
                <LoginMain>
                    <VerifyOTPComponent />
                </LoginMain>
            )}
        </>
    );
}