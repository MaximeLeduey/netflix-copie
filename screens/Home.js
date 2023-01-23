import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import MovieList from "../components/MovieList";
import HomePoster from "../components/HomePoster";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";


function Home() {

    const [posterData, setPosterData] = useState({});

    const [firstListData, setFirstListData] = useState([]);

    const [secondListData, setSecondListData] = useState([]);


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/popular/?api_key=741c99a9094ee27f1151d179c1dea765&langage=fr`).then((response) => {
            setPosterData(response.data.results[17]);
            setFirstListData(response.data.results);
          })
          .catch(err => {
            console.log(err);
          });
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=741c99a9094ee27f1151d179c1dea765&langage=fr').then((response) => {
          setSecondListData(response.data.results);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <ScrollView style={{backgroundColor:'black'}}>
            <StatusBar barStyle="light-content" backgroundColor='transparent' translucent={true}/>
            <HomePoster source={posterData.poster_path}  />
            <HeaderBar />
            <MovieList  data={firstListData} title='A Regarder Sans Modération' />
            <MovieList  data={secondListData} title='Films Du Moment' />
        </ScrollView>
        
    )
}

export default Home;

