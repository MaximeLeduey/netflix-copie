import React from "react";
import { MaterialCommunityIcons, MaterialIcons, Feather } from "react-native-vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import auth from "../config/Firebase";

function HeaderBar() {


    const logOut = async() => {
        try {
            await signOut(auth);
        }
        catch(err) {
            alert(err);
        }
    }

    return (
        <View style={styles.bar}>
            <View>
                <MaterialCommunityIcons name="netflix" size={45} color='red' />
            </View>
            <View style={styles.icons}>
                <MaterialIcons name='connected-tv' size={24} color='white' />
                <Feather name="search" size={24} color='white' />
                <MaterialIcons name='account-circle' onPress={logOut} size={24} color='white' />
            </View>
        </View>
   
    )
}

export default HeaderBar;


const styles = StyleSheet.create({
    bar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 100,
        width: '100%',
        position: 'absolute',
        top: 35
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 130
    }
})