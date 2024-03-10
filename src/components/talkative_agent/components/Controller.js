import React, { useState, useEffect } from "react";
import { View, Pressable, StatusBar, Image } from "react-native";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import uuid from "react-native-uuid";
import { getAuth } from "firebase/auth";

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
import BackgroundImage from "../../../../assets/talkative_agent/TalkativeAgentBackgroundImage.png";
import { PromptTextWhenWrong } from "../../../logistics/Logistics";
import {
    orgMicroButtonGradientStyle,
    onHoldMicroButtonGradientStyle,
} from "../../../styles/Styles";

// set some configurations for the audio
Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    playsInSilentModeIOS: true, // very important
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
    // defaultToSpeaker: true, // This is crucial for 'playAndRecord'
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
    const { recording, audioUri, startRecording, stopRecording } = useExpoAV();

    // arrangement for using userUID
    useEffect(() => {
        const auth = getAuth();
        setUserUID(auth.currentUser.uid);
    }, []);

    useEffect(() => {
        const reset = async () => {
            await handleResetConversation();
        };
        reset();
    }, []);

    const handleController = async (recordingUri) => {
        if (!recordingUri) {
            console.log("no uri: ", recordingUri);
            return;
        }

        try {
            setOnRecording(true);
            setIsLoading(true);

            // fetch audio blob response from the server
            // const audioBlob = await fetchAudioFromServer(state.results[0]);
            const audioBlob = await fetchAudioFromServer(recordingUri);

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

                    // fetch text response from the server
                    const { "ai text": ai_text, "user text": user_text } =
                        await fetchTextFromServer();

                    const processedUserText = user_text.replace(/\n/, ""); // chop off the \n in text from speech to text output

                    const date = new Date().toISOString().split("T")[0];
                    const time = new Date();

                    const messageID = uuid.v4();

                    setUserMessages((currentMessage) => [
                        ...currentMessage,
                        {
                            audioPath: recordingUri,
                            ID: messageID,
                            source: "user",
                            time: time,
                            date: date,
                            text: processedUserText,
                            userUID: userUID,
                        },
                    ]);

                    setAiMessages((currentMessage) => [
                        ...currentMessage,
                        {
                            audioPath: audioPath,
                            ID: messageID,
                            source: "ai",
                            time: time,
                            date: date,
                            text: ai_text,
                            userUID: userUID,
                        },
                    ]);

                    // destroy the SpeechToText engine
                    // destroySpeechToText();
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
                            startRecording();
                            setOnRecording(true);
                        }}
                        onPressOut={async () => {
                            const recordingUri = await stopRecording(); // This now waits for the stopRecording to finish.
                            if (recordingUri) {
                                handleController(recordingUri); // Pass the URI directly to handleController.
                            }
                            setOnRecording(false); // Update the recording state.
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
