import axios from "axios";

import { REACT_APP_BASE_URL_PRODUCTION, REACT_APP_BASE_URL_DEV } from "@env";

export default async function handleResetConversation() {
    try {
        const response = await axios.get(
            `${REACT_APP_BASE_URL_PRODUCTION}/english_tutor/reset_conversation/`
        );
        return response;
    } catch (error) {
        console.error("handleResetConversation error: ", error.message);
        return error.response;
    }
}
