import { View, ScrollView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

import togglePlayPause from "../apis/utils/togglePlayPause";
import toggleChosenMessageID from "../apis/utils/toggleChosenMessageID";
import playAudiofromAudioPath from "../apis/utils/playAudiofromAudioPath";
import fetchMessagesToServer from "../apis/fetchMessagesToServer";
import { ConversationAreaFrameStyle } from "../../../styles/Styles";
import LoadingDots from "./LoadingDotComponent";
import SpeechBubble from "./SpeechBubble";
import ConversationAreaHeader from "./ConversationAreaHeader";

export default function ConversationArea({ combinedMessages, isLoading }) {
    const [userName, setUserName] = useState("");
    const [onPlayingAudio, setOnPlayingAudio] = useState({
        audioPath: null,
        isReplaying: false,
    });

    // Arrange chosenMessagesID and chosenMessages states
    const [chosenMessagesID, setChosenMessagesID] = useState([]);
    const [chosenMessages, setChosenMessages] = useState([]);

    // Update the chosenMessages according to chosenMessagesID
    useEffect(() => {
        // Filter combinedMessages for messages whose ID is in chosenMessagesID
        const filteredMessages = combinedMessages.filter((message) =>
            chosenMessagesID.includes(message.ID)
        );

        setChosenMessages(filteredMessages);
    }, [chosenMessagesID, combinedMessages]);

    const scrollViewRef = useRef(); // Reference to the ScrollView

    useEffect(() => {
        const auth = getAuth();
        setUserName(auth.currentUser.displayName);
    }, []);

    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [combinedMessages]); // Scroll to bottom when combinedMessages changes

    // // handle toggle play and pause for loaded messages from server
    const handlePressTogglePlayPauseButton = async (audioPath) => {
        // Check if the pressed audio is currently playing
        if (onPlayingAudio.audioPath === audioPath) {
            // Toggle the play/pause state
            await togglePlayPause(audioPath); // Ensure this function handles toggling logic
            setOnPlayingAudio({ audioPath: audioPath, isPlaying: false });
        } else {
            // Play the new audio and update the currentAudio state
            await togglePlayPause(audioPath); // Ensure this starts playing the new audio
            setOnPlayingAudio({ audioPath: audioPath, isPlaying: true });
        }
    };

    return (
        <View>
            {/* Conversation area header */}
            <View style={{ marginTop: 50, paddingRight: 10 }}>
                <ConversationAreaHeader
                    chosenMessages={chosenMessages}
                    fetchMessagesToServer={fetchMessagesToServer}
                />
            </View>

            <View
                //  Conversation area frame
                style={{
                    ...ConversationAreaFrameStyle,
                }}
            >
                <ScrollView
                    ref={scrollViewRef} // Attach the ref to the ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    {combinedMessages.map((item, index) => {
                        const isChosen = chosenMessagesID.includes(item.ID);

                        if (item.source === "user") {
                            return (
                                <SpeechBubble
                                    key={index}
                                    ID={item.ID}
                                    source={userName}
                                    audioPath={item.audioPath}
                                    text={item.text}
                                    onPlayingAudio={onPlayingAudio}
                                    handlePressTogglePlayPauseButton={
                                        handlePressTogglePlayPauseButton
                                        // playAudiofromAudioPath
                                    }
                                    isChosen={isChosen}
                                    toggleChosen={() =>
                                        toggleChosenMessageID(
                                            item.ID,
                                            setChosenMessagesID
                                        )
                                    }
                                />
                            );
                        } else if (item.source === "ai") {
                            return (
                                <SpeechBubble
                                    key={index}
                                    ID={item.ID}
                                    source={"ai"}
                                    text={item.text}
                                    audioPath={item.audioPath}
                                    onPlayingAudio={onPlayingAudio}
                                    handlePressTogglePlayPauseButton={
                                        handlePressTogglePlayPauseButton
                                        // playAudiofromAudioPath
                                    }
                                    isChosen={isChosen}
                                    toggleChosen={() =>
                                        toggleChosenMessageID(
                                            item.ID,
                                            setChosenMessagesID
                                        )
                                    }
                                />
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
