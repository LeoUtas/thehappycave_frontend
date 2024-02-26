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

// AuthButton0Style is for sign in, reset password in the welcome screen
export const AuthButton0Style = {
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

// AuthButton1Style is for exit, signup, update password in the common room
export const AuthButton1Style = { width: 110, height: 50, borderRadius: 30 };

export const ServiceCardLayoutStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
};

export const ServiceTitleStyle = {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Fuzzy Bubbles Regular",
};

export const ServiceSubTitleStyle = {
    fontSize: 14,
    color: "white",
    fontFamily: "Fuzzy Bubbles Regular",
};

export const ServiceImageStyle = {
    height: hp(12),
    width: hp(12),
    margin: 0,
    borderRadius: 25,
};
