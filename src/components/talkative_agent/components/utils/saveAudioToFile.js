import * as ExpoFileSystem from "expo-file-system";

export default async function saveAudioToFile(audioData) {
    const path =
        ExpoFileSystem.documentDirectory +
        new Date().toISOString() +
        "temporaryAudio.mp3";

    await ExpoFileSystem.writeAsStringAsync(path, audioData, {
        encoding: ExpoFileSystem.EncodingType.Base64,
    });

    return path;
}
