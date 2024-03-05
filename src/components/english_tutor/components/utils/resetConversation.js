import axios from "axios";

import { REACT_APP_ENGLISH_TUTOR_RESET_ENDPOINT_PRODUCTION } from "@env";

// const ENGLISH_TUTOR_RESET_ENDPOINT =
//     "http://localhost:8000/english_tutor/reset_conversation/";

const ENGLISH_TUTOR_RESET_ENDPOINT =
    REACT_APP_ENGLISH_TUTOR_RESET_ENDPOINT_PRODUCTION;

export default async function handleResetConversation() {
    ENGLISH_TUTOR_RESET_ENDPOINT;

    try {
        const response = await axios.get(ENGLISH_TUTOR_RESET_ENDPOINT);
        return response;
    } catch (error) {
        console.error(error.message);
        return error.response;
    }
}
