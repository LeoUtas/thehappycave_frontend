import { Audio } from "expo-av";

export default async function playAudiofromAudioPath(path) {
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync({ uri: path });
        await soundObject.playAsync();
    } catch (error) {
        console.log(error.message);
    }
}
