import axios from "axios";

import { REACT_APP_TALKATIVE_AGENT_RESET_ENDPOINT_PRODUCTION } from "@env";

// const TALKATIVE_AGENT_RESET_ENDPOINT =
//     "http://localhost:8000/talkative_agent/reset_conversation/";

const TALKATIVE_AGENT_RESET_ENDPOINT =
    REACT_APP_TALKATIVE_AGENT_RESET_ENDPOINT_PRODUCTION;

export default async function handleResetConversation() {
    TALKATIVE_AGENT_RESET_ENDPOINT;

    try {
        const response = await axios.get(TALKATIVE_AGENT_RESET_ENDPOINT);
        return response;
    } catch (error) {
        console.error("handleResetConversation error: ", error.message);
        return error.response;
    }
}
