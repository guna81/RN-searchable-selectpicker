import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import ArrowDownIcon from "./ArrowDownIcon";

const MaterialDropDown = ({ options, value, onChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (value) {
            const newValue = options.find((item) => item.value === value);
            setSelectedItem(newValue);
        }

    }, [value]);

    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.option} onPress={() => onChange(item.value)}>
                <Text style={styles.optionText}>{item.label}</Text>
            </Pressable>
        );
    };


    return (
        <>
            <Pressable style={styles.dropdown} onPress={() => setShowDropdown(true)}>
                <View style={styles.selectedItem}>
                    {selectedItem ?
                        <Text>{selectedItem.label}</Text>
                        :
                        <Text style={styles.placeholder}>Select an item</Text>
                    }
                    <ArrowDownIcon />
                </View>
            </Pressable>

            <Modal visible={showDropdown} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={"#ccc"}
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={(value) => setSearchText(value)}
                    />
                    <FlatList
                        style={styles.dropdownList}
                        data={options.filter((item) => {
                            return item.label.toLowerCase().includes(
                                searchText.toLowerCase()
                            );
                        })}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `picker-item-${index}`}
                    />
                </View>
            </Modal>
        </>
    );
};


export default MaterialDropDown;

const styles = StyleSheet.create({
    dropdown: {
        width: "100%",
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        marginTop: 8,
        marginBottom: 10,
    },
    selectedItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    modalContainer: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 24,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    searchInput: {
        marginBottom: 10,
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "white",

        paddingHorizontal: 10,
        color: "black",
    },
    dropdownList: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 5,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
});
