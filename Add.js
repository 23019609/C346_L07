import React, { useState } from "react";
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { datasource } from "./Data.js";

const styles = StyleSheet.create({
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
        width: 373,
        height: 40,
        borderRadius: 25,
        elevation: 2,
        marginTop: 15,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

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

function Add({ navigation }) {
    const [name, setName] = useState("");
    const [amt, setAmt] = useState("");
    const [type, setType] = useState("");

    return (
        <View style={{ margin: 20 }}>
            <Text style={styles.headerText}>Add New Income/Expense</Text>
            <Text style={{ fontFamily: "Poppins" }}>Entry Name:</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    padding: 10,
                    borderColor: "#5e6163",
                    backgroundColor: "#ececec",
                }}
                maxLength={50}
                onChangeText={(text) => setName(text)}
            />

            <Text style={{ fontFamily: "Poppins" }}>Amount: $</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    padding: 10,
                    borderColor: "#5e6163",
                    backgroundColor: "#ececec",
                }}
                maxLength={20}
                onChangeText={(text) => setAmt(text)}
            />

            <Text style={{ fontFamily: "Poppins" }}>Type:</Text>
            <RNPickerSelect
                onValueChange={(value) => {
                    setType(value);
                }}
                items={[
                    { label: "Income", value: "Income" },
                    { label: "Expense", value: "Expense" },
                ]}
                value={type}
            />

            <View style={{ marginTop: 10 }}>
                <CustomButton
                    btnText="SUBMIT"
                    btnBackground="#c1e1c1"
                    handlePress={() => {
                        let item = { key: name, amt: amt };
                        let indexnum = 1;
                        if (type === "Income") {
                            indexnum = 0;
                        }
                        datasource[indexnum].data.push(item);
                        navigation.navigate("Home");
                    }}
                />
            </View>
        </View>
    );
}

export default Add;
