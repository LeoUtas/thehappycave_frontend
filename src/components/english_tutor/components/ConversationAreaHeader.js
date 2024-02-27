import { View, Image } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderImage from "../../../../assets/english_tutor/headerImage.png";

export default function ConversationAreaHeader() {
    const imageStyle = {
        marginTop: 10,
        width: wp("85%"),
        height: hp(12),
        resizeMode: "contain",
        alignSelf: "center",
        borderRadius: 55,
    };

    return (
        <View>
            <Image source={HeaderImage} style={imageStyle} />
        </View>
    );
}
