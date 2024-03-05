import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Image, TextInput } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { auth } from "../../../../Firebase/firebase";
import HomeButton from "../../authentication/HomeButton";
import GoBackOneStepButton from "../../../navigation/GobackOneStepButton";
import HelloUserCard from "../../authentication/HelloUserCard";
import BackgroundImage from "../../../../assets/english_tutor/EnglishConversationRecordBackgroundImage.png";
import { TextGlowingEffect, fontFamilyStyle } from "../../../styles/Styles";

export default function EnglishConversationRecords() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(auth.currentUser.displayName);
    }, []);

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />

            <HelloUserCard userName={userName} />

            <Text
                style={{
                    fontFamily: fontFamilyStyle,
                    fontSize: 25,
                    paddingTop: hp(5),
                    paddingHorizontal: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    ...TextGlowingEffect,
                }}
            >
                English Conversation Records
            </Text>

            <View
                style={{
                    marginTop: 20,
                    paddingBottom: 10,
                    padding: 5,
                    height: hp("62%"),
                    width: wp("94%"),
                    alignSelf: "center",
                    borderWidth: 2,
                    borderColor: "#557c93",
                    borderRadius: 15,
                    overflow: "hidden",
                }}
            >
                {/* <View
                    style={{
                        alignSelf: "center",
                        backgroundColor: "rgba(238, 247, 255, 0.3)",
                        width: wp("80%"),
                        height: 40,
                        borderRadius: 45,
                        marginTop: 26,
                        marginLeft: 15,
                        paddingLeft: 20,
                    }}
                >
                    <TextInput
                        placeholder="What are you looking for?"
                        placeholderTextColor={"grey"}
                        style={{ height: "100%" }}
                    />
                </View> */}
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        marginLeft: 20,
                    }}
                >
                    <GoBackOneStepButton text={"Back "} />
                </View>

                <View
                    style={{
                        marginRight: 20,
                    }}
                >
                    <HomeButton />
                </View>
            </View>
        </View>
    );
}
