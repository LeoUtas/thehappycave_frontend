import { View, Image, StatusBar } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import BackgroundImage from "../../assets/welcomeImage.png";
import HeaderPanel from "./HeaderPanel";
import ToSigninButton from "../components/authentication/ToSigninButton";

export default function WelcomeScreen() {
    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <View style={{ marginTop: hp(20), marginBottom: hp(18) }}>
                <HeaderPanel />
            </View>
            <View style={{ marginTop: 5 }}>
                <ToSigninButton text={"tap here"} />
            </View>
        </View>
    );
}
