import {
    REACT_APP_ENGLISH_TUTOR_ENDPOINT_DEV,
    REACT_APP_ENGLISH_TUTOR_ENDPOINT_PRODUCTION,
} from "@env";

// const ENGLISH_TUTOR_ENDPOINT = REACT_APP_ENGLISH_TUTOR_ENDPOINT_DEV;
// const ENGLISH_TUTOR_ENDPOINT = REACT_APP_ENGLISH_TUTOR_ENDPOINT_PRODUCTION;
const ENGLISH_TUTOR_ENDPOINT =
    "http://localhost:8000/aichatbot_web/get_ai_response/";
// "https://aichatbot-backend-c82886e0972c.herokuapp.com/aichatbot_web/get_ai_response/";

console.log(ENGLISH_TUTOR_ENDPOINT);

// export default async function fetchAudio(text) {
//     ENGLISH_TUTOR_ENDPOINT;

//     const response = await fetch(ENGLISH_TUTOR_ENDPOINT, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: text }),
//     });

//     return await response.blob();
// }

// export default async function fetchAudio(fileUri) {
//     const formData = new FormData();
//     formData.append("file", {
//         uri: fileUri,
//         type: "audio/mpeg", // or the correct MIME type of the audio file
//         name: "audiofile", // the name of the file in the multipart form
//     });

//     const response = await fetch(ENGLISH_TUTOR_ENDPOINT, {
//         method: "POST",
//         headers: {
//             "Content-Type": "multipart/form-data",
//             Accept: "application/octet-stream", // expecting binary data in response
//         },
//         body: formData,
//     });

//     if (!response.ok) {
//         throw new Error(
//             `Network response was not ok, status: ${response.status}`
//         );
//     }

//     return await response.blob(); // get the binary data as a blob
// }

export default async function fetchAudio(recordingUri) {
    // Create a new FormData instance
    let formData = new FormData();
    // Append the file to the FormData instance
    // The name 'file' should match with the backend expectation
    formData.append("file", {
        uri: recordingUri,
        type: "audio/x-m4a", // Assuming the file is in .m4a format, change if different
        name: "recording.m4a", // The backend should save the file with this name
    });

    // Fetch options including method, headers and body
    const fetchOptions = {
        method: "POST",
        body: formData,
        headers: {
            // Content-Type is not needed here, as it's set automatically by the FormData instance
            // 'Accept' can be set to whatever response type you expect, e.g., 'audio/mpeg'
            Accept: "audio/mpeg",
        },
    };
    console.log(ENGLISH_TUTOR_ENDPOINT);

    // Perform the fetch operation
    try {
        const response = await fetch(ENGLISH_TUTOR_ENDPOINT, fetchOptions);
        if (!response.ok) {
            throw new Error(
                `Network response was not ok, status: ${response.status}`
            );
        }
        // If response is okay, return the blob
        return await response.blob();
    } catch (error) {
        console.error("Fetching audio failed", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}
