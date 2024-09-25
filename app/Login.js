import LoginMain from "../components/Login/LoginMain";
import LoginComponent from "../components/Login/LoginComponent";
import { useEffect, useState } from "react";
export default function Login() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    return (
        <>
            {isMobile ? (
                <LoginComponent />
            ) : (
                <LoginMain>
                    <LoginComponent />
                </LoginMain>
            )}
        </>
    );
}