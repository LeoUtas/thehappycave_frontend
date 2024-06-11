import { REACT_APP_BASE_URL_PRODUCTION, REACT_APP_BASE_URL_DEV } from "@env";

export default async function fetchTextFromServer() {
    try {
        const response = await fetch(
            `${REACT_APP_BASE_URL_PRODUCTION}/english_tutor/get_ai_text_response/`
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
