import { REACT_APP_ENGLISH_TUTOR_FETCH_AUDIO_FROM_SERVER_ENDPOINT_PRODUCTION } from "@env";

// const ENGLISH_TUTOR_FETCH_AUDIO_FROM_SERVER_ENDPOINT =
//     "http://localhost:8000/english_tutor/get_ai_audio_response/";

const ENGLISH_TUTOR_FETCH_AUDIO_FROM_SERVER_ENDPOINT =
    REACT_APP_ENGLISH_TUTOR_FETCH_AUDIO_FROM_SERVER_ENDPOINT_PRODUCTION;

export default async function fetchAudioFromServer(text) {
    ENGLISH_TUTOR_FETCH_AUDIO_FROM_SERVER_ENDPOINT;

    const response = await fetch(
        ENGLISH_TUTOR_FETCH_AUDIO_FROM_SERVER_ENDPOINT,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text }),
        }
    );

    return await response.blob();
}
