import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome5 } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { getAuth } from "firebase/auth";

import { togglePlayPause } from "./utils/replayAudioManager";
import { TextGlowingEffect } from "../../../styles/Styles";
import LoadingDots from "./LoadingDotComponent";

export default function ConversationArea({ combinedArray, isLoading }) {
    const [userName, setUserName] = useState("");
    const [isReplaying, setIsReplaying] = useState(false);
    const [onPlayingAudio, setOnPlayingAudio] = useState({
        audioPath: null,
        isReplaying: false,
    });

    const scrollViewRef = useRef(); // Reference to the ScrollView

    useEffect(() => {
        const auth = getAuth();
        setUserName(auth.currentUser.displayName);
    }, []);

    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [combinedArray]); // Scroll to bottom when combinedArray changes

    const handlePressTogglePlayPauseButton = async (audioPath) => {
        // Check if the pressed audio is currently playing
        if (onPlayingAudio.audioPath === audioPath) {
            // Toggle the play/pause state
            await togglePlayPause(audioPath); // Ensure this function handles toggling logic
            setOnPlayingAudio({
                ...onPlayingAudio,
                isReplaying: !onPlayingAudio.isReplaying,
            });
        } else {
            // Play the new audio and update the currentAudio state
            await togglePlayPause(audioPath); // Ensure this starts playing the new audio
            setOnPlayingAudio({ audioPath: audioPath, isReplaying: true });
        }
    };

    return (
        <View>
            {/* Title */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: wp(15),
                    width: "100%",
                    paddingTop: 5,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Fuzzy Bubbles Bold",
                        fontSize: 14,
                        color: "white",
                        ...TextGlowingEffect,
                    }}
                >
                    {userName}
                </Text>
                <Text
                    style={{
                        fontFamily: "Fuzzy Bubbles Bold",
                        fontSize: 14,
                        color: "white",
                        ...TextGlowingEffect,
                    }}
                >
                    Ms.PunsAlot
                </Text>
            </View>

            {/* Conversation frame */}
            <View
                style={{
                    marginTop: 5,
                    paddingBottom: 10,
                    padding: 5,
                    height: hp("62%"),
                    width: wp("90%"),
                    alignSelf: "center",
                    borderWidth: 2,
                    borderColor: "#557c93",
                    borderRadius: 35,
                    overflow: "hidden",
                }}
            >
                <ScrollView
                    ref={scrollViewRef} // Attach the ref to the ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    {combinedArray.map((item, index) => {
                        if (item.source === "user") {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: "#b2e5f8",
                                        padding: 10,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 20,
                                        borderBottomRightRadius: 20,
                                        borderBottomLeftRadius: 25,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    <Text
                                        style={{
                                            paddingHorizontal: 10,
                                            fontFamily: "Fuzzy Bubbles Regular",
                                        }}
                                    >
                                        {item.text}
                                    </Text>
                                </View>
                            );
                        } else if (item.source === "openai") {
                            return (
                                <LinearGradient
                                    key={index}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={["#53dbf2", "#c5aef2", "#8578ea"]}
                                    style={{
                                        padding: 10,
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 25,
                                        borderBottomLeftRadius: 20,
                                        alignSelf: "flex-end",
                                    }}
                                >
                                    <Pressable
                                        onPress={() =>
                                            handlePressTogglePlayPauseButton(
                                                item.audioPath
                                            )
                                        }
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            paddingRight: 10,
                                            paddingLeft: 5,
                                        }}
                                    >
                                        {onPlayingAudio.audioPath ===
                                            item.audioPath &&
                                        onPlayingAudio.isReplaying ? (
                                            <FontAwesome5
                                                name="pause"
                                                size={14}
                                                color="#474ed7"
                                                style={{ marginRight: 10 }}
                                            />
                                        ) : (
                                            <FontAwesome5
                                                name="play"
                                                size={14}
                                                color="#474ed7"
                                                style={{ marginRight: 10 }}
                                            />
                                        )}

                                        <Text
                                            style={{
                                                color: "white",
                                                fontFamily:
                                                    "Fuzzy Bubbles Regular",
                                            }}
                                        >
                                            openai response
                                        </Text>
                                    </Pressable>
                                </LinearGradient>
                            );
                        }
                    })}
                    {isLoading && (
                        <LoadingDots dots={4} size={15} bounceHeight={30} />
                    )}
                </ScrollView>
            </View>
        </View>
    );
}
