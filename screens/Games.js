import React from "react";
import { Text, View, StatusBar } from "react-native";
import HeaderBar2 from "../components/HeaderBar2";

function Games() {
    return (
        <View>
            <StatusBar barStyle="light-content" backgroundColor='black' translucent={true}/>
            <HeaderBar2 title='Jeux' />
        </View>
    )
}

export default Games;