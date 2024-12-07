import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SectionList,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    useFonts,
    ArbutusSlab_400Regular,
} from "@expo-google-fonts/arbutus-slab";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { datasource } from "./Data.js";

const styles = StyleSheet.create({
    opacityStyle: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#c8d3f566",
        marginBottom: 15,
        borderRadius: 10,
        borderLeftWidth: 8,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        flex: 1,
        padding: 10,
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Poppins",
        marginLeft: -15,
        // fontWeight: "bold",
    },
    iconContainer: {
        flex: 1,
        textAlign: "left",
    },
    headerText: {
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#23395d",
        borderStyle: "dashed",
        textAlign: "center",
        color: "#23395d",
        fontSize: 22,
        fontFamily: "Arbutus_Slab",
    },
    buttonBackground: {
        alignItems: "center",
        justifyContent: "center",
        width: 170,
        height: 40,
        borderRadius: 25,
        elevation: 2,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

const Home = ({ navigation }) => {
    useFonts({
        Arbutus_Slab: ArbutusSlab_400Regular,
        Poppins: Poppins_600SemiBold,
    });

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.opacityStyle,
                    { borderLeftColor: section.bgColor },
                ]}
                onPress={() =>
                    navigation.navigate("Edit", {
                        index: index,
                        type: section.type,
                        key: item.key,
                        value: item.amt,
                    })
                }
            >
                <View styles={styles.iconContainer}>
                    <Icon name={section.icon} size={20} color={section.color} />
                </View>
                <Text style={styles.textStyle}>
                    {item.key} - ${parseFloat(item.amt).toFixed(2)}
                </Text>
            </TouchableOpacity>
        );
    };

    // reference: https://docs.expo.dev/ui-programming/react-native-styling-buttons/
    function CustomButton({ btnBackground, handlePress, btnText }) {
        return (
            <TouchableOpacity
                style={[
                    styles.buttonBackground,
                    { backgroundColor: btnBackground },
                ]}
                onPress={handlePress}
            >
                <Text style={[styles.buttonText, { color: "#4a4a4ae6" }]}>
                    {btnText}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ margin: 20 }}>
            <StatusBar />
            <Text style={styles.headerText}>Income and Expense Manager</Text>
            <View>
                <SectionList
                    sections={datasource}
                    renderItem={renderItem}
                    // renderSectionHeader={({
                    //     section: { type, bgColor, color, icon },
                    // }) => (
                    //     <Text
                    //         style={[
                    //             styles.headerText,
                    //             { backgroundColor: bgColor, color: color },
                    //         ]}
                    //     >
                    //         <Icon name={icon} size={17} color={color} /> {type}
                    //     </Text>
                    // )}
                />
            </View>

            <View
                style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flex: 1, margin: 10 }}>
                    <CustomButton
                        btnText="ADD AMOUNT"
                        btnBackground="#c1e1c1"
                        handlePress={() => navigation.navigate("Add")}
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <CustomButton
                        btnText="TOTAL AMOUNT"
                        btnBackground="#c8b3e1"
                        handlePress={() => {
                            let totalIncome = 0;
                            let totalExpense = 0;

                            for (let i = 0; i < datasource.length; i++) {
                                let section = datasource[i];

                                if (section.type === "Income") {
                                    for (
                                        let i = 0;
                                        i < section.data.length;
                                        i++
                                    ) {
                                        totalIncome += parseFloat(
                                            section.data[i].amt,
                                        );
                                    }
                                } else if (section.type === "Expense") {
                                    for (
                                        let i = 0;
                                        i < section.data.length;
                                        i++
                                    ) {
                                        totalExpense += parseFloat(
                                            section.data[i].amt,
                                        );
                                    }
                                }
                            }

                            // const allData = datasource.map(section => {
                            //     let totalIncome = 0;
                            //     let totalExpense = 0;
                            //
                            //     if (section.type === "Income") {
                            //         for (let i = 0; i < section.data.length; i++) {
                            //             totalIncome += parseFloat(section.data[i].amt)
                            //         }
                            //     } else if (section.type === "Expense") {
                            //         for (let i = 0; i < section.data.length; i++) {
                            //             totalExpense += parseFloat(section.data[i].amt)
                            //         }
                            //     }
                            //     console.log(totalIncome);
                            //     console.log(totalExpense);
                            //     error - returns 110.5, 0, 0, and 17 instead of just 110.5 and 17
                            // });

                            const totalAmount = totalIncome - totalExpense;

                            // Math.abs --> absolute value
                            // Math.round --> round to nearest whole number
                            // Math.ceil --> round up
                            // Math.floor --> round down
                            // <number>.toFixed(2) --> round to 2 decimal places
                            let msg =
                                "Total Income: $" +
                                totalIncome.toFixed(2) +
                                "\nTotal Expense: $" +
                                totalExpense.toFixed(2) +
                                "\nYou have a " +
                                (totalAmount > 0 ? "surplus" : "deficit") +
                                " of $" +
                                Math.abs(totalAmount).toFixed(2);

                            // idk how style this without using modal or smth
                            Alert.alert("", msg, [
                                {
                                    text: "Ok",
                                },
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Home;
