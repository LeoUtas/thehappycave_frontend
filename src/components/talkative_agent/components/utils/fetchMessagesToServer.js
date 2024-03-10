import { REACT_APP_TALKATIVE_AGENT_FETCH_AUDIOTEXT_TO_SERVER_ENDPOINT_PRODUCTION } from "@env";

// const TALKATIVE_AGENT_FETCH_TO_SERVER_ENDPOINT =
//     "http://localhost:8000/talkative_agent/post_messages/";

const TALKATIVE_AGENT_FETCH_TO_SERVER_ENDPOINT =
    REACT_APP_TALKATIVE_AGENT_FETCH_AUDIOTEXT_TO_SERVER_ENDPOINT_PRODUCTION;

import RNFetchBlob from "rn-fetch-blob";

export default async function fetchMessagesToServer(messages) {
    TALKATIVE_AGENT_FETCH_TO_SERVER_ENDPOINT;

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
                TALKATIVE_AGENT_FETCH_TO_SERVER_ENDPOINT,
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
