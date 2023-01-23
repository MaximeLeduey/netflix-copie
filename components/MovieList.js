import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

function MovieList({data, title}) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView horizontal={true}>
                {data.map(image => {
                    const path = 'https://image.tmdb.org/t/p/w300' + image.poster_path;
                    return (
                        <Image source={{uri:path}} style={styles.images}  />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default MovieList;

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        paddingHorizontal: 10,
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        marginBottom: 5
    },
    images: {
        width: 100,
        height: 150,
        marginRight: 7
    }
})