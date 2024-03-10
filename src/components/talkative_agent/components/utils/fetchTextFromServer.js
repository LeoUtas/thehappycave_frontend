import { REACT_APP_TALKATIVE_AGENT_FETCH_TEXT_FROM_SERVER_ENDPOINT_PRODUCTION } from "@env";

// const TALKATIVE_AGENT_FETCH_TEXT_FROM_SERVER_ENDPOINT =
//     "http://localhost:8000/talkative_agent/get_ai_text_response/";

const TALKATIVE_AGENT_FETCH_TEXT_FROM_SERVER_ENDPOINT =
    REACT_APP_TALKATIVE_AGENT_FETCH_TEXT_FROM_SERVER_ENDPOINT_PRODUCTION;

export default async function fetchTextFromServer() {
    TALKATIVE_AGENT_FETCH_TEXT_FROM_SERVER_ENDPOINT;

    try {
        const response = await fetch(
            TALKATIVE_AGENT_FETCH_TEXT_FROM_SERVER_ENDPOINT
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const text = await response.json();
        console.log(text);
        return text;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}
