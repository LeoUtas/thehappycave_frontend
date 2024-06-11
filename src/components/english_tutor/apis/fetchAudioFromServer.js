import { REACT_APP_BASE_URL_PRODUCTION, REACT_APP_BASE_URL_DEV } from "@env";

export default async function fetchAudioFromServer(text) {
    const response = await fetch(
        `${REACT_APP_BASE_URL_PRODUCTION}/english_tutor/get_ai_audio_response/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text }),
        }
    );

    return await response.blob();
}
