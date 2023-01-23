import React from "react";
import { Image, StyleSheet, View } from "react-native";

function HomePoster({source}) {

    const posterPath = 'https://image.tmdb.org/t/p/w300' + source;


    return (
        <View style={styles.container}>
            <Image source={{uri:posterPath}} style={{width: '100%', height: '100%'}} />
        </View>
     
    )
}

export default HomePoster


const styles = StyleSheet.create({
    container: {
        height: 500,
        width: '100%',
        // position: 'absolute',
        // top: 0,
        zIndex: 100,
    }
})