export default function toggleChosenMessageID(messageID, setChosenMessages) {
    setChosenMessages((prev) => {
        const isAlreadyChosen = prev.includes(messageID);
        if (isAlreadyChosen) {
            // Remove from chosenMessages
            return prev.filter((id) => id !== messageID);
        } else {
            // Add to chosenMessages
            return [...prev, messageID];
        }
    });
}
