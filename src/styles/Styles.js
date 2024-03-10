import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const fontFamilyRegularStyle = "Fuzzy Bubbles Regular";
export const fontFamilyBoldStyle = "Fuzzy Bubbles Bold";

export const TextGlowingEffect = {
    textShadowColor: "rgba(255, 255, 255, 0.85)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
};

export const AuthFormFormat = {
    backgroundColor: "#EEF7FF",
    width: wp("80%"),
    height: 40,
    borderRadius: 45,
    marginBottom: 15, // for space between forms
    paddingLeft: 20,
};

// AuthButton0Style is for sign in, reset password in the welcome screen
export const AuthButton0Style = {
    borderRadius: 45,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
};

// AuthButton1Style is for exit, signup, update password in the common room
export const AuthButton1Style = { width: 110, height: 50, borderRadius: 30 };

export const ProfileDiceCardStyle = {
    height: hp("14%"),
    width: hp("14%"),
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 20,
    overflow: "hidden",
};

export const orgMicroButtonGradientStyle = ["#0b3866", "#4b749f"];
export const onHoldMicroButtonGradientStyle = ["#4b749f", "#243748"];

export const OpacityRateProfileDiceCardStyle = 0.3;

export const ServiceCardLayoutStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
};

export const ServiceImageStyle = {
    height: hp(12),
    width: hp(12),
    margin: 0,
    borderRadius: 25,
};

export const ConversationAreaFrameStyle = {
    marginTop: 5,
    paddingBottom: 10,
    padding: 5,
    height: hp("62%"),
    width: wp("94%"),
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#557c93",
    borderRadius: 35,
    overflow: "hidden",
};

export const UserSpeechBubbleStyle = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 30,
    width: "55%",
    alignSelf: "flex-start",
};

export const AiSpeechBubbleStyle = {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 25,
    width: "55%",
    alignSelf: "flex-end",
};

export const UserSpeechBubbleTextStyle = {
    flex: 1,
    padding: 5,
    paddingHorizontal: 10,
    marginRight: 15,
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 30,
    backgroundColor: "rgba(43, 69, 132, .5)",
};

export const AiSpeechBubbleTextStyle = {
    flex: 1,
    padding: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    alignSelf: "flex-end",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 25,
    backgroundColor: "rgba(62, 25, 110, .5)",
};

export const AilinearGradientColorStyle = ["#53dbf2", "#c5aef2", "#8578ea"];

export const UserlinearGradientColorStyle = ["#f6f6f6", "#05c9f9", "#268ab2"];

export const ConversationAreaFrameForRecordsStyle = {
    marginTop: 15,
    paddingBottom: 10,
    padding: 5,
    height: hp("66%"),
    width: wp("94%"),
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#557c93",
    borderRadius: 35,
    overflow: "hidden",
};
