import { useCallback, useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";

export default function useReactNativeVoice() {
    const [state, setState] = useState({
        recognized: "",
        pitch: "",
        error: "",
        end: "",
        started: "",
        results: [],
        partialResults: [],
        isRecording: false,
    });

    const resetState = useCallback(() => {
        setState({
            recognized: "",
            pitch: "",
            error: "",
            end: "",
            started: "",
            results: [],
            partialResults: [],
            isRecording: false,
        });
    }, [setState]);

    const startSpeechToText = useCallback(async () => {
        resetState();
        try {
            await Voice.start("en-US");
        } catch (error) {
            console.log(error.message);
        }
    }, [resetState]);

    const stopSpeechToText = useCallback(async () => {
        try {
            await Voice.stop();
        } catch (error) {
            console.log(error.message);
        }
    }, [resetState]);

    const cancelSpeechToText = useCallback(async () => {
        try {
            await Voice.cancel();
        } catch (error) {
            console.log(error.message);
        }
    }, [resetState]);

    const destroySpeechToText = useCallback(async () => {
        try {
            await Voice.destroy();
        } catch (error) {
            console.log(error.message);
        }
        resetState();
    }, [resetState]);

    useEffect(() => {
        Voice.onSpeechStart = (event) => {
            setState((prevState) => ({
                ...prevState,
                started: "Started",
                isRecording: true,
            }));
        };

        Voice.onSpeechRecognized = () => {
            setState((prevState) => ({
                ...prevState,
                recognized: "Recognized",
            }));
        };

        Voice.onSpeechEnd = (event) => {
            setState((prevState) => ({
                ...prevState,
                end: "Ended",
                isRecording: false,
            }));
        };

        Voice.onSpeechError = (error) => {
            setState((prevState) => ({
                ...prevState,
                error: JSON.stringify(error.error),
                isRecording: false,
            }));
        };

        Voice.onSpeechResults = (event) => {
            if (event.value) {
                setState((prevState) => ({
                    ...prevState,
                    results: event.value,
                }));
            }
        };

        Voice.onSpeechPartialResults = (event) => {
            if (event.value) {
                setState((prevState) => ({
                    ...prevState,
                    partialResults: event.value,
                }));
            }
        };

        Voice.onSpeechVolumeChanged = (event) => {
            setState((prevState) => ({ ...prevState, pitch: event.value }));
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    return {
        state,
        setState,
        resetState,
        startSpeechToText,
        stopSpeechToText,
        cancelSpeechToText,
        destroySpeechToText,
    };
}
