import LoginMain from '../components/Web/Login/LoginMain';
import RegisterComponent from '../components/Web/Login/RegisterComponent';
import MobileRegisterComponent from '../components/Mobile/Login/RegisterComponent';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
export default function Register() {
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
                <MobileRegisterComponent />
            ) : (
                <LoginMain>
                    <RegisterComponent />
                </LoginMain>
            )}
        </>
    );
}
