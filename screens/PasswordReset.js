import { sendPasswordResetEmail } from "firebase/auth";
import {React, useState} from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import auth from "../config/Firebase";




function PasswordReset({setReset}) {

    const [email, setEmail] = useState();

    const [error, setError] = useState();

    const [isLoading, setIsLoading] = useState(false);

    async function HandleClick(email) {
        try {
            await sendPasswordResetEmail(auth, email);  
        }
        catch(error) {
            if(error.code == "auth/missing-email") {
                setError('Veuillez renseigner un email');
            }
            else if(error.code == "auth/invalid-email") {
                setError('Cet email est invalide');
            }
            else {
                setError('Cet email ne correspond à aucun compte');
            }
        }
        
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.logotype} onPress={() => setReset(false) }>Netflix</Text>
                <Text style={styles.title}>Réinitialiser mot de passe</Text>
                <TextInput placeholder="Email" placeholderTextColor='gray' onChangeText={(text) => {setEmail(text); setError(''); setIsLoading(false)}} value={email} style={styles.input} />
                {error && 
                    <Text style={styles.error}>{error}</Text>
                }
                <TouchableOpacity onPress={() => {HandleClick(email); setIsLoading(true); setEmail('')}} style={styles.button}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Envoyer Email</Text>
                </TouchableOpacity>
                {(isLoading && !error) &&
                    <ActivityIndicator size='large' color='lightgray' animating={isLoading} />
                }
            </SafeAreaView>
        </>
    )
}

export default PasswordReset;


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