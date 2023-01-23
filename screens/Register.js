import { createUserWithEmailAndPassword } from "firebase/auth";
import {React, useEffect, useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import auth from "../config/Firebase";




function Register({setIsRegistered}) {

    const [email, setEmail] = useState();

    const [password, setPassword] = useState();

    const [error, setError] = useState();

    const [isLoading, setIsLoading] = useState(false);

    async function HandleClick(email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsRegistered(true);   
        }
        catch(error) {
            if(error.code == "auth/missing-email") {
                setError('Veuillez renseigner un email');
            }
            else {
                setError('Email ou mot de passe incorrect');
            }
        }
        
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.logotype} onPress={() => setIsRegistered(true)}>Netflix</Text>
                <Text style={styles.title}>S'inscrire</Text>
                <TextInput placeholder="Email" placeholderTextColor='gray' onChangeText={(text) => {setEmail(text); setError(''); setIsLoading(false)}} value={email} style={styles.input} />
                <TextInput placeholder="Mot de passe" secureTextEntry={true} placeholderTextColor='gray' onChangeText={(text) => {setPassword(text); setError(''); setIsLoading(false)}} value={password} style={styles.input} />
                {error &&
                    <Text style={styles.error}>{error}</Text>
                }
                <TouchableOpacity onPress={() => {HandleClick(email, password); setIsLoading(true); setPassword('')}} style={styles.button}>
                    <Text style={{color:'white', fontWeight:'bold'}}>S'inscrire</Text>
                </TouchableOpacity>
                {(isLoading && !error) &&
                    <ActivityIndicator size='large' color='lightgray' animating={isLoading} />
                }
            </SafeAreaView>
        </>
    )
}

export default Register;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#110E0E',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    logotype: {
        color: 'red',
        fontSize: 30,
        fontWeight: '500',
        margin: 10
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        margin: 15
    },
    input: {
        backgroundColor: '#2B2424',
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 5,
        color: 'gray'
    },
    button: {
        backgroundColor: 'red',
        padding: 15,
        alignItems:'center',
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 5
    },
    error : {
        color: 'red',
        marginHorizontal: 10
    }
})