import { StyleSheet } from "react-native";
import {
    fontFamilyBoldStyle,
    fontFamilyRegularStyle,
    TextGlowingEffect,
} from "./Styles";

export const TextStyles = StyleSheet.create({
    HeaderPanelTitle: {
        fontFamily: fontFamilyBoldStyle,
        fontWeight: "bold",
        color: "white",
        fontSize: 36,
        textAlign: "center",
        ...TextGlowingEffect,
    },

    HeaderPanelSubtitle: {
        fontFamily: fontFamilyBoldStyle,
        fontWeight: "bold",
        color: "white",
        fontSize: 22,
        textAlign: "center",
        marginTop: 20,
        ...TextGlowingEffect,
    },

    AuthTitle: {
        fontFamily: fontFamilyBoldStyle,
        fontSize: 26,
        color: "white",
        textAlign: "center",
    },

    AuthTextButton: {
        fontFamily: fontFamilyRegularStyle,
        fontSize: 20,
        color: "white",
    },

    HelloUserText: {
        fontFamily: fontFamilyRegularStyle,
        fontSize: 14,
        color: "white",
        textAlign: "right",
    },

    ServiceTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        fontFamily: fontFamilyBoldStyle,
    },

    ServiceSubtitle: {
        fontSize: 14,
        color: "white",
        fontFamily: fontFamilyRegularStyle,
    },

    SpeechBubbleTitle: {
        color: "white",
        fontFamily: fontFamilyRegularStyle,
        fontWeight: "bold",
        textAlign: "center",
    },

    SpeechBubbleText: {
        color: "white",
        fontFamily: fontFamilyRegularStyle,
        textAlign: "center",
    },
});
