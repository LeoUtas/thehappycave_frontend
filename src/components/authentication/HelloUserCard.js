import { View, Text } from "react-native";
import React from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { fontFamilyStyle } from "../../styles/Styles";

export default function HelloUserCard({ userName }) {
    return (
        <View
            style={{
                paddingTop: hp(6),
                marginRight: wp(10),
                alignSelf: "flex-end",
            }}
        >
            <Text
                style={{
                    fontFamily: fontFamilyStyle,
                    fontSize: 14,
                    color: "white",
                    textAlign: "right",
                }}
            >
                Hello{" "}
                <Text
                    style={{
                        fontFamily: fontFamilyStyle,
                        fontSize: 16,
                        color: "white",
                        textAlign: "right",
                    }}
                >
                    {userName}
                </Text>
            </Text>
        </View>
    );
}
