import {
    View,
    Text,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { updatePassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";

import BackgroundImage from "../../../assets/homeImage.png";
import HomeButton from "../authentication/HomeButton";
import {
    AuthFormFormat,
    AuthButtonStyle,
    TextGlowingEffect,
} from "../../styles/Styles";
import { TextStyles } from "../../styles/FontStyles";
import HeaderPanel from "../../screens/HeaderPanel";
import HelloUserCard from "./HelloUserCard";

export default function UpdatePassword() {
    const navigation = useNavigation();

    const [userName, setUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
    }, []);

    const handleUpdatePassword = async () => {
        if (newPassword && newPassword === confirmNewPassword) {
            try {
                const user = auth.currentUser;
                await updatePassword(user, newPassword).then(() => {
                    alert("Update successful");
                });
                navigation.navigate("Home");
            } catch (error) {
                console.log("error when updating password: ", error.message);
            }
        } else {
            alert("It's required to enter: Email, Password & Confirm Password");
        }
    };

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <HelloUserCard userName={userName} />

            <View style={{ marginTop: hp(10), marginBottom: 25 }}>
                <HeaderPanel />
            </View>

            <View style={{ alignItems: "center" }}>
                {/* Update password title */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={TextStyles.AuthTitle}>Update password</Text>
                </View>

                {/* Password Input */}
                <View>
                    <View style={{ ...AuthFormFormat }}>
                        <TextInput
                            placeholder="New Password"
                            placeholderTextColor={"grey"}
                            secureTextEntry
                            style={{ height: "100%" }}
                            value={newPassword}
                            onChangeText={(value) => setNewPassword(value)}
                        />
                    </View>
                    <View style={{ ...AuthFormFormat }}>
                        <TextInput
                            placeholder="Confirm new password"
                            placeholderTextColor={"grey"}
                            secureTextEntry
                            style={{ height: "100%" }}
                            value={confirmNewPassword}
                            onChangeText={(value) =>
                                setConfirmNewPassword(value)
                            }
                        />
                    </View>
                </View>

                {/* Request Reset Password Button */}
                <TouchableOpacity
                    onPress={handleUpdatePassword}
                    style={{
                        ...AuthButtonStyle,
                    }}
                >
                    <Text
                        style={[
                            TextStyles.AuthTextButton,
                            { ...TextGlowingEffect },
                        ]}
                    >
                        tap to update
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    left: 0,
                    right: 0,
                }}
            >
                <HomeButton />
            </View>
        </View>
    );
}
