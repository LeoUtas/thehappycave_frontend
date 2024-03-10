import { View, Text } from "react-native";
import React from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { TextStyles } from "../../styles/FontStyles";

export default function HelloUserCard({ userName }) {
    return (
        <View
            style={{
                paddingTop: hp(6),
                marginRight: wp(10),
                alignSelf: "flex-end",
            }}
        >
            <Text style={TextStyles.HelloUserText}>
                Hello{" "}
                <Text style={[TextStyles.HelloUserText, { fontSize: 16 }]}>
                    {userName}
                </Text>
            </Text>
        </View>
    );
}
