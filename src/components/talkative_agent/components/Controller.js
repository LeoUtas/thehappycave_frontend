import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Pressable, StatusBar, Image } from "react-native";
import Header from "./Header";
import useReactNativeVoice from "./hooks/useReactNativeVoice";
import { Audio } from "expo-av";
import * as ExpoFileSystem from "expo-file-system"; // not use for now
import { FontAwesome5 } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";

import fetchAudio from "./utils/fetchAudio";
import handleResetConversation from "./utils/resetConversation";
import saveAudioToFile from "./utils/saveAudioToFile";
import playAudiofromAudioPath from "./utils/playAudiofromAudioPath";
import combineArrays from "./utils/combineArrays";
import HomeButton from "./HomeButton";
import ResetButton from "./ResetButton";
import ConversationArea from "./ConversationArea";
import BackgroundImage from "../../../../assets/BackgroundImage.png";

// set some configurations for the audio
Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    playsInSilentModeIOS: true, // very important
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
});

const orgMicroButtonGradient = ["#0b3866", "#4b749f"];
const onHoldMicroButtonGradient = ["#4b749f", "#243748"];

export default function Controller() {
    const [onRecording, setOnRecording] = useState(false);
    const [audioResponse, setAudioResponse] = useState([]);
    const [textRequest, setTextRequest] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { state, startSpeechToText, stopSpeechToText, destroySpeechToText } =
        useReactNativeVoice();

    // const [urlPath, setUrlPath] = useState("");

    // const ListAudioFiles = async () => {
    //     try {
    //         const result = await ExpoFileSystem.readAsStringAsync(
    //             ExpoFileSystem.documentDirectory
    //         );
    //         if (result.length > 0) {
    //             const fileName = result[0];
    //             const path = ExpoFileSystem.documentDirectory + fileName;
    //             setUrlPath(path);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    const handleController = async () => {
        if (!state.results[0]) {
            return;
        }
        try {
            setOnRecording(true);
            setIsLoading(true);

            // fetch Audio blob from the server
            const audioBlob = await fetchAudio(state.results[0]);

            const fileReader = new FileReader();
            fileReader.onload = async (event) => {
                if (event.target && typeof event.target.result === "string") {
                    //  [data:audio/mpeg; base64 , ... (actual base64 data) ...]
                    const audioData = event.target.result.split(",")[1];

                    // save the audioData
                    const audioPath = await saveAudioToFile(audioData);

                    // play the audioData
                    // setUrlPath(audioPath);
                    await playAudiofromAudioPath(audioPath);

                    setIsLoading(false);

                    setTextRequest((currentTextRequest) => [
                        ...currentTextRequest,
                        {
                            text: state.results[0],
                            source: "user",
                            time: new Date().toISOString(),
                        },
                    ]);

                    setAudioResponse((currentAudioResponse) => [
                        ...currentAudioResponse,
                        {
                            audioPath: audioPath,
                            source: "openai",
                            time: new Date().toISOString(),
                        },
                    ]);

                    // destroy the SpeechToText engine
                    destroySpeechToText();
                    setOnRecording(false);
                }
            };

            fileReader.readAsDataURL(audioBlob);
        } catch (error) {
            console.log(error.message);
        }
    };

    const combinedArray = combineArrays(textRequest, audioResponse);

    const handleResetButton = async () => {
        const response = await handleResetConversation();
        if (response && response.status === 200) {
            setTextRequest([]);
            setAudioResponse([]);
        } else {
            console.log("Resetting error");
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
            <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
                <Header />

                <ConversationArea
                    combinedArray={combinedArray}
                    isLoading={isLoading}
                />

                {/* Controller Buttons container */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 50,
                        width: "100%",
                        paddingHorizontal: 20,
                    }}
                >
                    {/* Home button */}
                    <HomeButton />

                    {/* Record button */}
                    <Pressable
                        onPressIn={() => {
                            startSpeechToText();
                            setOnRecording(true);
                        }}
                        onPressOut={() => {
                            stopSpeechToText();
                            handleController();
                            setOnRecording(false);
                        }}
                        style={{
                            width: 160,
                            height: 120,
                            borderRadius: 45,
                            padding: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={
                                onRecording
                                    ? onHoldMicroButtonGradient
                                    : orgMicroButtonGradient
                            }
                            style={{
                                borderRadius: 45,
                                width: "100%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesome5
                                name="microphone"
                                size={34}
                                color={onRecording ? "#08203e" : "#fff"}
                            />
                        </LinearGradient>
                    </Pressable>

                    {/* Reset button */}
                    <ResetButton onReset={handleResetButton} />
                </View>
            </SafeAreaView>
        </View>
    );
}
