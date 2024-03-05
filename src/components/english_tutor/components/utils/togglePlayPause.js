import { Audio } from "expo-av";

let currentAudio = null;
let isPlaying = false;
let currentUri = "";

// export async function togglePlayPause(newAudioUri) {
//     // If there's a current audio and the URI is different from the new one, unload the current audio
//     if (currentAudio && currentUri !== newAudioUri) {
//         await currentAudio.unloadAsync();
//         currentAudio = null;
//         isPlaying = false;
//     }

//     // If there's no current audio, or we just unloaded a different track
//     if (!currentAudio) {
//         const { sound } = await Audio.Sound.createAsync(
//             { uri: newAudioUri },
//             { shouldPlay: true }
//         );
//         currentAudio = sound;
//         currentUri = newAudioUri; // Update currentUri to the new audio's URI
//         isPlaying = true;

//         // Listen to the playback status
//         currentAudio.setOnPlaybackStatusUpdate((status) => {
//             isPlaying = status.isPlaying;
//             if (status.didJustFinish) {
//                 currentAudio.unloadAsync();
//                 currentAudio = null;
//                 isPlaying = false;
//                 currentUri = ""; // Reset currentUri when audio finishes playing
//             }
//         });
//     } else if (isPlaying) {
//         // If the audio is currently playing, pause it
//         await currentAudio.pauseAsync();
//         isPlaying = false;
//     } else {
//         // If the audio is paused, resume playing
//         await currentAudio.playAsync();
//         isPlaying = true;
//     }
// }

export default async function togglePlayPause(newAudioUri, shouldLoop = false) {
    // If there's a current audio and the URI is different from the new one, unload the current audio
    if (currentAudio && currentUri !== newAudioUri) {
        await currentAudio.unloadAsync();
        currentAudio = null;
        isPlaying = false;
    }

    // If there's no current audio, or we just unloaded a different track
    if (!currentAudio) {
        const { sound } = await Audio.Sound.createAsync(
            { uri: newAudioUri },
            { shouldPlay: true, isLooping: shouldLoop } // Enable looping if required
        );
        currentAudio = sound;
        currentUri = newAudioUri; // Update currentUri to the new audio's URI
        isPlaying = true;

        currentAudio.setOnPlaybackStatusUpdate((status) => {
            isPlaying = status.isPlaying;
            if (status.didJustFinish && !shouldLoop) {
                // Handle auto-replay or stopping based on shouldLoop
                currentAudio.stopAsync(); // Stop and rewind for manual replay
                currentAudio.playAsync(); // Replay automatically if shouldLoop is true
                isPlaying = true;
            }
        });
    } else if (isPlaying) {
        // If the audio is currently playing, pause it
        await currentAudio.pauseAsync();
        isPlaying = false;
    } else {
        // If the audio is paused, resume playing
        await currentAudio.playAsync();
        isPlaying = true;
    }
}
