import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

import {
    UserSpeechBubbleStyle,
    AiSpeechBubbleStyle,
    UserSpeechBubbleTextStyle,
    AiSpeechBubbleTextStyle,
    AilinearGradientColorStyle,
    UserlinearGradientColorStyle,
} from "../../../styles/Styles";
import { TextStyles } from "../../../styles/FontStyles";

export default function SpeechBubble({
    index,
    ID,
    source,
    text,
    audioPath,
    onPlayingAudio,
    handlePressTogglePlayPauseButton,
    isChosen,
    toggleChosen,
}) {
    const [textDisplay, setTextDisplay] = useState(false);

    // toggle between displaying the text message or not
    const toggleTextDisplay = () => {
        setTextDisplay(!textDisplay);
    };

    // styling for the linear gradient component according to source
    const linearGradientColor =
        source === "ai"
            ? AilinearGradientColorStyle
            : UserlinearGradientColorStyle;

    // styling for the speech bubble according to source
    const bubbleStyle =
        source === "ai" ? AiSpeechBubbleStyle : UserSpeechBubbleStyle;

    // stylying for the text message according to source
    const displayTextStyle =
        source === "ai" ? AiSpeechBubbleTextStyle : UserSpeechBubbleTextStyle;

    const bubbleSpeechHeight = 10; // style the height of bubbleSpeech

    return (
        <View style={{ paddingVertical: 10 }}>
            <LinearGradient
                key={index}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={linearGradientColor}
                style={bubbleStyle}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable
                        onPress={() =>
                            handlePressTogglePlayPauseButton(audioPath)
                        }
                        style={{
                            paddingHorizontal: 15,
                            paddingVertical: bubbleSpeechHeight,
                        }}
                    >
                        <FontAwesome5
                            name={
                                onPlayingAudio.audioPath === audioPath &&
                                onPlayingAudio.isReplaying
                                    ? "pause"
                                    : "play"
                            }
                            size={14}
                            color="#474ed7"
                        />
                    </Pressable>

                    <Pressable
                        onPress={toggleTextDisplay}
                        style={{ flex: 1, paddingVertical: bubbleSpeechHeight }}
                    >
                        <Text style={TextStyles.SpeechBubbleTitle}>
                            {source === "ai" ? "Ms. PunsAlot" : source}
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            toggleChosen(ID);
                        }}
                    >
                        <AntDesign
                            name={isChosen ? "star" : "staro"}
                            size={20}
                            color={isChosen ? "gold" : "white"}
                            style={{
                                paddingHorizontal: 15,
                                paddingVertical: bubbleSpeechHeight,
                            }}
                        />
                    </Pressable>
                </View>
            </LinearGradient>

            {textDisplay && (
                <View style={displayTextStyle}>
                    <Text style={TextStyles.SpeechBubbleText}>{text}</Text>
                </View>
            )}
        </View>
    );
}
