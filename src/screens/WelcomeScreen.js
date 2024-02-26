import { View, Image, StatusBar } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import BackgroundImage from "../../assets/welcomeImage.png";
import Signin from "../components/authentication/Signin";
import HeaderPanel from "./HeaderPanel";
import ToResetPasswordButton from "../components/authentication/ToResetPasswordButton";

export default function WelcomeScreen() {
    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <HeaderPanel />

            <View style={{ marginBottom: hp(30) }}>
                <View>
                    <Signin />
                </View>
                <View>
                    <ToResetPasswordButton />
                </View>
            </View>
        </View>
    );
}
