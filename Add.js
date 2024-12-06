import React, { useState } from "react";
import { TextInput, View, Text, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { datasource } from "./Data.js";

function Add({ navigation }) {
    const [name, setName] = useState("");
    const [amt , setAmt] = useState("");
    const [type, setType] = useState("");

    return (
        <View style={{ margin: 20 }}>
            <Text style={{ paddingBottom: 5 }}>Name:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                maxLength={50}
                onChangeText={(text) => setName(text)}
            />

            <Text style={{ paddingBottom: 5 }}>Amount:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                maxLength={20}
                onChangeText={(text) => setAmt(text)}
            />

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
                <Button
                    title="Submit"
                    onPress={() => {
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
