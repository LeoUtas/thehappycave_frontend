import { REACT_APP_ENGLISH_TUTOR_FETCH_TEXT_FROM_SERVER_ENDPOINT_PRODUCTION } from "@env";

// const ENGLISH_TUTOR_FETCH_TEXT_FROM_SERVER_ENDPOINT =
//     "http://localhost:8000/english_tutor/get_ai_text_response/";

const ENGLISH_TUTOR_FETCH_TEXT_FROM_SERVER_ENDPOINT =
    REACT_APP_ENGLISH_TUTOR_FETCH_TEXT_FROM_SERVER_ENDPOINT_PRODUCTION;

export default async function fetchTextFromServer() {
    ENGLISH_TUTOR_FETCH_TEXT_FROM_SERVER_ENDPOINT;

    try {
        const response = await fetch(
            ENGLISH_TUTOR_FETCH_TEXT_FROM_SERVER_ENDPOINT
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const text = await response.json();
        return text;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}
