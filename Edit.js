import React, { useState } from "react";
import {
    TextInput,
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
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

function Edit({ navigation, route }) {
    const [name, setName] = useState(route.params.key);
    const [amt, setAmt] = useState(route.params.value);
    const type = route.params.type;

    return (
        <View style={{ margin: 20 }}>
            <Text style={styles.headerText}>Edit {type} Entry</Text>
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
                value={name}
            />

            <Text style={{ fontFamily: "Poppins" }}>Amount: $</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    paddingLeft: 10,
                    borderColor: "#5e6163",
                    backgroundColor: "#ececec",
                }}
                maxLength={20}
                onChangeText={(text) => setAmt(text)}
                value={amt}
            />

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                }}
            >
                <View style={{ flex: 1, margin: 10 }}>
                    <CustomButton
                        btnText="SAVE"
                        btnBackground="#c1e1c1"
                        handlePress={() => {
                            let indexnum = 1;
                            if (route.params.type === "Income") {
                                indexnum = 0;
                            }
                            datasource[indexnum].data[route.params.index].key =
                                name;
                            datasource[indexnum].data[route.params.index].amt =
                                amt;
                            navigation.navigate("Home");
                        }}
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <CustomButton
                        btnText="DELETE"
                        btnBackground="#ff8f8f80"
                        handlePress={() => {
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
