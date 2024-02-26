import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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

export const AuthButtonStyle = {
    borderRadius: 45,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
};

export const AuthTitleStyle = {
    fontFamily: "Fuzzy Bubbles Bold",
    fontSize: 26,
    color: "white",
    textAlign: "center",
};
