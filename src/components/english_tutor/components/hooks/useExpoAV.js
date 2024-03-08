import { useCallback, useState, useEffect } from "react";
import { Audio } from "expo-av";

export default function useExpoAV() {
    const [recording, setRecording] = useState(null);
    const [permissionResponse, setPermissionResponse] = useState(null);
    const [audioUri, setAudioUri] = useState(null);

    const requestPermission = useCallback(async () => {
        const response = await Audio.requestPermissionsAsync();
        setPermissionResponse(response);
    }, []);

    useEffect(() => {
        requestPermission();
    }, [requestPermission]);

    const startRecording = useCallback(async () => {
        try {
            if (permissionResponse?.status !== "granted") {
                // console.log("Requesting permission ...");
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // console.log("Starting recording ...");
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            // console.log("Recording started");
        } catch (error) {
            console.error("Failed to start recording", error);
        }
    }, [permissionResponse, requestPermission]);

    const stopRecording = useCallback(async () => {
        // console.log("Stopping recording ...");
        if (recording) {
            setRecording(undefined);
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            const audioUri = recording.getURI();
            setAudioUri(audioUri);
            return audioUri;
        }
    }, [recording]);

    return {
        audioUri,
        recording,
        startRecording,
        stopRecording,
        permissionResponse,
    };
}
