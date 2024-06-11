import { REACT_APP_BASE_URL_PRODUCTION, REACT_APP_BASE_URL_DEV } from "@env";

import RNFetchBlob from "rn-fetch-blob";

export default async function fetchMessagesToServer(messages) {
    for (const message of messages) {
        try {
            const filename = message.audioPath.split("/").pop();
            const formData = [
                {
                    name: "audio_file",
                    filename,
                    type: "audio/mpeg",
                    data: RNFetchBlob.wrap(
                        message.audioPath.replace("file://", "")
                    ),
                },
                { name: "ID", data: message.ID },
                { name: "source", data: message.source },
                { name: "time", data: message.time },
                { name: "date", data: message.date },
                { name: "text", data: message.text },
                { name: "userUID", data: message.userUID },
            ];

            const serverResponse = await RNFetchBlob.fetch(
                "POST",
                `${REACT_APP_BASE_URL_PRODUCTION}/english_tutor/post_messages/`,
                {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
                formData
            );

            const data = await serverResponse.json();
            // console.log("Upload successful:", data);
        } catch (error) {
            console.error("Error uploading message:", error);
        }
    }
}
