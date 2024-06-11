import { View, Image, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { Wander } from "react-native-animated-spinkit";

import HeaderImage from "../../../../assets/english_tutor/flyingBookImage.png";
import { fontFamilyRegularStyle } from "../../../styles/Styles";

export default function ConversationAreaHeader({
    chosenMessages,
    fetchMessagesToServer,
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePressToSaveMessages = async () => {
        setIsLoading(true);
        try {
            await fetchMessagesToServer(chosenMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View
            style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginVertical: 15,
            }}
        >
            <Pressable
                onPress={handlePressToSaveMessages}
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.5 : 1,
                    },
                ]}
            >
                {isLoading ? (
                    <View
                        style={{
                            padding: 20,
                        }}
                    >
                        <Wander size={48} color="rgba(255, 255, 255, 0.5)" />
                    </View>
                ) : (
                    <Image
                        source={HeaderImage}
                        style={{
                            width: hp(12),
                            height: hp(12),
                            borderRadius: 55,
                        }}
                    />
                )}
            </Pressable>

            <View
                style={{
                    flexDirection: "column",
                    gap: 5,
                    borderRadius: 15,
                    marginTop: 15,
                    justifyContent: "center",
                    paddingHorizontal: 15,
                    height: 66,
                    backgroundColor: "rgba(155, 175, 217, .6)",
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                        style={{
                            fontFamily: fontFamilyRegularStyle,
                            color: "white",
                        }}
                    >
                        Tap
                    </Text>
                    <AntDesign
                        name="star"
                        size={20}
                        color="gold"
                        style={{
                            paddingHorizontal: 8,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: fontFamilyRegularStyle,
                            color: "white",
                        }}
                    >
                        to select records
                    </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome
                        name="long-arrow-left"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                    />
                    <Text
                        style={{
                            fontFamily: fontFamilyRegularStyle,
                            color: "white",
                        }}
                    >
                        Tap
                    </Text>
                    <Entypo
                        name="open-book"
                        size={24}
                        color="white"
                        style={{
                            paddingHorizontal: 8,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: fontFamilyRegularStyle,
                            color: "white",
                        }}
                    >
                        to save
                    </Text>
                </View>
            </View>
        </View>
    );
}
