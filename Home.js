import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SectionList,
    Button,
    Image,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { datasource } from "./Data.js";

const styles = StyleSheet.create({
    opacityStyle: {
        borderLeftWidth: 5,
        backgroundColor: "#c8d3f566",
        marginBottom: 5,
    },
    textStyle: {
        textAlign: "center",
        verticalAlign: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 15,
        margin: 10,
    },
    headerText: {
        borderBottomWidth: 1,
        borderStyle: "dashed",
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        fontVariant: "small-caps",
        marginBottom: 30,
    },
});

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.opacityStyle,
                    { borderLeftColor: section.color },
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
                <Text style={styles.textStyle}>
                    {item.key} - ${parseFloat(item.amt).toFixed(2)}{" "}
                    <Icon name={section.icon} size={17} color={section.color} />
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ margin: 20, marginBottom: 125 }}>
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
                    <Button
                        title="Add Amount"
                        onPress={() => navigation.navigate("Add")}
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="Total Amount"
                        onPress={() => {
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
