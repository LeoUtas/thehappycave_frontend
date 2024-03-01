This branch is where I do an experiment of making a recording audio using Expo-av, then fetch the recorded audio to the backend for using as the input of whisper-1 (i.e., a STT by OpenAI), after that using the transcript (i.e., output of whisper-1) as the input of a text generation (i.e., GPT3.5 turbo by OpenAi) to request a text response before turning that text response into an audio response.

Observed problems:

1. whisper-1 transcribes some nonsense recorded audios (e.g., noises, etc.) into some texts like "Thank you", etc.,

2. Observed nonsense texts include but not limit to: ["Thank you", "Thank you for watching!", "Thanks for watching", "You"]

3. Noted that whisper-1 can transcribes any recorded audios into any kind of sounds in different languages that it might think the sounds actually make sense in the languages other than English.

Summary
It's not worth to use whisper-1 at this point. 2024, March 1st.
