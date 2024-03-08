import React, { useState, useEffect } from "react";
import { View, Pressable, StatusBar, Image } from "react-native";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import uuid from "react-native-uuid";
import { getAuth } from "firebase/auth";

import {
    orgMicroButtonGradientStyle,
    onHoldMicroButtonGradientStyle,
} from "../../../styles/Styles";

import useReactNativeVoice from "./hooks/useReactNativeVoice";
import useExpoAV from "./hooks/useExpoAV";
import fetchAudioFromServer from "./utils/fetchAudioFromServer";
import fetchTextFromServer from "./utils/fetchTextFromServer";
import handleResetConversation from "./utils/resetConversation";
import saveAudioToFile from "./utils/saveAudioToFile";
import playAudiofromAudioPath from "./utils/playAudiofromAudioPath";
import combineArrays from "./utils/combineArrays";
import HomeButton from "../../authentication/HomeButton";
import ResetButton from "./ResetButton";
import ConversationArea from "./ConversationArea";
import BackgroundImage from "../../../../assets/english_tutor/EnglishTutorBackgroundImage2.png";

// set some configurations for the audio
Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    playsInSilentModeIOS: false, // very important
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
});

const orgMicroButtonGradient = orgMicroButtonGradientStyle;
const onHoldMicroButtonGradient = onHoldMicroButtonGradientStyle;

export default function Controller() {
    // arrangement for the onRecording state before handle recording, STT, etc.
    const [onRecording, setOnRecording] = useState(false);

    // arrangement for making the loading dots (i.e., while loading ... )
    const [isLoading, setIsLoading] = useState(false);

    // arrangement for using user UID
    const [userUID, setUserUID] = useState(null);

    // arrangement for making combinedMessages (i.e., combining user and ai messages)
    const [userMessages, setUserMessages] = useState([]);
    const [aiMessages, setAiMessages] = useState([]);

    // arrangement for using react-native-voice custom hook
    const { state, startSpeechToText, stopSpeechToText, destroySpeechToText } =
        useReactNativeVoice();

    // arrangement for using expo-av custom hook
    const { audioUri, startRecording, stopRecording } = useExpoAV();

    // arrangement for using userUID
    useEffect(() => {
        const auth = getAuth();
        setUserUID(auth.currentUser.uid);
    }, []);

    const handleController = async () => {
        if (!state.results[0]) {
            return;
        }
        try {
            setOnRecording(true);
            setIsLoading(true);

            // fetch audio blob response from the server
            const audioBlob = await fetchAudioFromServer(state.results[0]);

            const fileReader = new FileReader();
            fileReader.onload = async (event) => {
                if (event.target && typeof event.target.result === "string") {
                    //  [data:audio/mpeg; base64 , ... (actual base64 data) ...]
                    const audioData = event.target.result.split(",")[1];

                    // save the audioData
                    const audioPath = await saveAudioToFile(audioData);

                    setIsLoading(false);

                    // play the audioData
                    await playAudiofromAudioPath(audioPath);

                    const audioUri = await stopRecording();

                    // fetch text response from the server
                    const { text: openai_text } = await fetchTextFromServer();

                    const date = new Date().toISOString().split("T")[0];
                    const messageID = uuid.v4();

                    setUserMessages((currentMessage) => [
                        ...currentMessage,
                        {
                            audioPath: audioUri,
                            ID: messageID,
                            source: "user",
                            date: date,
                            text: state.results[0],
                            userUID: userUID,
                        },
                    ]);

                    setAiMessages((currentMessage) => [
                        ...currentMessage,
                        {
                            audioPath: audioPath,
                            ID: messageID,
                            source: "openai",
                            date: date,
                            text: openai_text,
                            userUID: userUID,
                        },
                    ]);

                    // destroy the SpeechToText engine
                    destroySpeechToText();
                    setOnRecording(false);
                }
            };

            fileReader.readAsDataURL(audioBlob);
        } catch (error) {
            console.error("error at handleController: ", error.message);
        }
    };

    const combinedMessages = combineArrays(userMessages, aiMessages);

    const handleResetButton = async () => {
        const response = await handleResetConversation();
        if (response && response.status === 200) {
            setUserMessages([]);
            setAiMessages([]);
        } else {
            console.error("Resetting error");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Image
                source={BackgroundImage}
                resizeMode="cover"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            />
            <View style={{ flex: 1, alignItems: "center" }}>
                {/* Conversation area frame */}
                <ConversationArea
                    combinedMessages={combinedMessages}
                    isLoading={isLoading}
                />

                {/* Controller buttons container */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 25,
                        width: "100%",
                        paddingHorizontal: 20,
                    }}
                >
                    {/* Buttons */}
                    {/* Home button */}
                    <HomeButton />

                    {/* Record button */}
                    <Pressable
                        onPressIn={() => {
                            startSpeechToText();
                            startRecording();
                            setOnRecording(true);
                        }}
                        onPressOut={async () => {
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
            </View>
        </View>
    );
}
