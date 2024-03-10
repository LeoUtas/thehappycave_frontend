import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../Firebase/firebase";

export default async function fetchDataFromFirestore(collectionName, userUID) {
    try {
        // Create a Firestore query based on collection and userUID
        const q = query(
            collection(db, collectionName),
            where("userUID", "==", userUID)
        );

        // Execute the query and get the query snapshot
        const querySnapshot = await getDocs(q);

        // Array to store transformed data
        const fetchedData = [];

        // Iterate over each document snapshot in the query snapshot
        querySnapshot.forEach((doc) => {
            // Transform the fetched data and add it to the array
            fetchedData.push(transformFetchedData(doc.data()));
        });

        return fetchedData;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}

// Function to transform fetched data
function transformFetchedData(data) {
    return {
        audioPath: data.audio_url,
        ID: data.ID,
        source: data.source,
        time: data.time,
        date: data.date,
        text: data.text,
        userUID: data.userUID,
        search: data.text + " " + data.date,
    };
}
