import React, { useState } from "react";
import { TextInput, View, Text, Button, Alert } from "react-native";
import { datasource } from "./Data.js";

function Edit({ navigation, route }) {
    const [name, setName] = useState(route.params.key);
    const [amt, setAmt] = useState(route.params.value);

    return (
        <View style={{ margin: 20 }}>
            <Text style={{ paddingBottom: 5 }}>Name:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                maxLength={50}
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <Text style={{ paddingBottom: 5 }}>Amount:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                maxLength={20}
                onChangeText={(text) => setAmt(text)}
                value={amt}
            />

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="Save"
                        onPress={() => {
                            let indexnum = 1;
                            if (route.params.type === "Income") {
                                indexnum = 0;
                            }
                            datasource[indexnum].data[route.params.index].key = name
                            datasource[indexnum].data[route.params.index].amt = amt
                            navigation.navigate("Home");
                        }}
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            let indexnum = 1;
                            if (route.params.type === "Income") {
                                indexnum = 0;
                            }

                            Alert.alert("Are you sure?", "", [
                                {
                                    text: "Yes",
                                    onPress: () => {
                                        datasource[indexnum].data.splice(
                                            route.params.index,
                                            1,
                                        );
                                        navigation.navigate("Home");
                                    },
                                },
                                { text: "No" },
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

export default Edit;
