import React, { useEffect } from "react";
import AppNavigation from "./src/navigation";
import { useFonts } from "expo-font";
import { TextStyles } from "./src/styles/FontStyles";
import useExpoAV from "./src/components/english_tutor/components/hooks/useExpoAV";
import * as SplashScreen from "expo-splash-screen";

import "./Firebase/firebase";

export default function App() {
    const { requestPermission } = useExpoAV();

    useEffect(() => {
        requestPermission();
    }, []);

    const [fontsLoaded] = useFonts({
        "Fuzzy Bubbles Regular": require("../the-happy-cave/assets/fonts/Fuzzy Bubbles Regular.ttf"),
        "Fuzzy Bubbles Bold": require("../the-happy-cave/assets/fonts/Fuzzy Bubbles Bold.ttf"),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }

    return <AppNavigation />;
}
