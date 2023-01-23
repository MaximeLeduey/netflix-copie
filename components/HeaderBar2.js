import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { MaterialIcons, Feather } from "react-native-vector-icons";

function HeaderBar2({title}) {


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
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.icons}>
                <MaterialIcons name='connected-tv' size={24} color='white' />
                <Feather name="search" size={24} color='white' />
                <MaterialIcons name='account-circle' onPress={logOut} size={24} color='white' />
            </View>
        </View>
   
    )
}

export default HeaderBar2;


const styles = StyleSheet.create({
    bar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'black',
        zIndex: 100,
        width: '100%',
        position: 'absolute',
        top: 35
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 130
    },
    title : {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
})