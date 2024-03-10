import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../Firebase/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const SERVICE_NAME = "TalkativeAgent";

export default async function fetchDeleteMessagesFromServer(ID) {
    try {
        // delete data from Firestore collections
        await deleteDoc(doc(db, `userMessages${SERVICE_NAME}`, ID));
        await deleteDoc(doc(db, `aiMessages${SERVICE_NAME}`, ID));

        const storage = getStorage();

        const userPath = `userAudio${SERVICE_NAME}/${ID}`;
        const userAudioRef = ref(storage, userPath);

        const aiPath = `aiAudio${SERVICE_NAME}/${ID}`;
        const aiAudioRef = ref(storage, aiPath);

        // Delete the file
        deleteObject(userAudioRef);

        // Delete the file
        deleteObject(aiAudioRef);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return error.response;
    }
}
