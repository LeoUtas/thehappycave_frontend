// import { Audio } from "expo-av";

// let currentAudio = null;

// export async function replayAudiofromAudioPath(newAudioUri) {
//     if (currentAudio) {
//         await currentAudio.unloadAsync(); // Stop the current audio if it's playing
//     }

//     const { sound } = await Audio.Sound.createAsync(
//         { uri: newAudioUri },
//         { shouldPlay: true }
//     );
//     currentAudio = sound;

//     //  Listen to the playback status and unload the audio when it finishes playing
//     currentAudio.setOnPlaybackStatusUpdate(async (status) => {
//         if (status.didJustFinish) {
//             await currentAudio.unloadAsync();
//             currentAudio = null;
//         }
//     });
// }

// export async function pauseAudio() {
//     if (currentAudio) {
//         await currentAudio.pauseAsync(); // Pause the currently playing audio
//     }
// }

import { Audio } from "expo-av";

let currentAudio = null;
let isPlaying = false;
let currentUri = "";

export async function togglePlayPause(newAudioUri) {
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
            { shouldPlay: true }
        );
        currentAudio = sound;
        currentUri = newAudioUri; // Update currentUri to the new audio's URI
        isPlaying = true;

        // Listen to the playback status
        currentAudio.setOnPlaybackStatusUpdate((status) => {
            isPlaying = status.isPlaying;
            if (status.didJustFinish) {
                currentAudio.unloadAsync();
                currentAudio = null;
                isPlaying = false;
                currentUri = ""; // Reset currentUri when audio finishes playing
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
