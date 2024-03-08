import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../Firebase/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const SERVICE_NAME = "EnglishTutor";

export default async function fetchDeleteMessagesFromServer(ID) {
    try {
        // delete data from Firestore collections
        await deleteDoc(doc(db, `userMessages${SERVICE_NAME}`, ID));
        await deleteDoc(doc(db, `openaiMessages${SERVICE_NAME}`, ID));

        const storage = getStorage();

        const userPath = `userAudio${SERVICE_NAME}/${ID}`;
        const userAudioRef = ref(storage, userPath);

        const openaiPath = `openaiAudio${SERVICE_NAME}/${ID}`;
        const openaiAudioRef = ref(storage, openaiPath);

        // Delete the file
        deleteObject(userAudioRef);

        // Delete the file
        deleteObject(openaiAudioRef);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return error.response;
    }
}
