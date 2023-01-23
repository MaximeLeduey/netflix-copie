import { isEmpty } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import {React, useState} from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import auth from "../config/Firebase";




function Login({setReset, setIsRegistered}) {

    const [email, setEmail] = useState();

    const [password, setPassword] = useState();

    const [error, setError] = useState();

    const [isLoading, setIsLoading] = useState(false);

    async function HandleClick(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
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
                <Text style={styles.logotype}>Netflix</Text>
                <Text style={styles.title}>S'identifier</Text>
                <TextInput placeholder="Email" placeholderTextColor='gray' onChangeText={(text) => {setEmail(text); setError(''); setIsLoading(false)}} value={email} style={styles.input} />
                <TextInput placeholder="Mot de passe" secureTextEntry={true} placeholderTextColor='gray' onChangeText={(text) => {setPassword(text); setError(''); setIsLoading(false)}} value={password} style={styles.input} />
                {error &&
                    <Text style={styles.error}>{error}</Text>
                }
                <TouchableOpacity onPress={() =>{ HandleClick(email, password); setIsLoading(true); setPassword('')}} style={styles.button}>
                    <Text style={{color:'white', fontWeight:'bold'}}>S'identifier</Text>
                </TouchableOpacity>
                {(isLoading && !error) &&
                    <ActivityIndicator size='large' color='lightgray' animating={isLoading} />
                }
                <Text style={styles.paragraph} onPress={() => setIsRegistered(false)}>Je n'ai pas de compte</Text>
                <Text style={styles.paragraph} onPress={() => {setReset(true)}}>J'ai oublié mon mot de passe</Text>
            </SafeAreaView>
        </>
    )
}

export default Login;


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
        marginVertical: 30,
        marginHorizontal: 10,
        borderRadius: 5
    },
    paragraph: {
        color: 'white',
        fontSize: 14,
        marginHorizontal: 10,
        marginBottom: 20
    },
    error : {
        color: 'red',
        marginHorizontal: 10
    }
})