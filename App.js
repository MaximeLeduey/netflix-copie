import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Home from "./screens/Home";
import Games from "./screens/Games";
import New from "./screens/New";
import Feed from "./screens/Feed";
import Downloaded from "./screens/Downloaded";
import Login from "./screens/Login";
import Register from "./screens/Register";
import PasswordReset from "./screens/PasswordReset";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { StatusBar  } from "react-native";
import auth from "./config/Firebase";



export default function App() {


  const Tab = createMaterialBottomTabNavigator();

  const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: "transparent",
    },
  };

  const [homeIcon, setHomeIcon] = useState(true);

  const [gamesIcon, setGamesIcon] = useState(false);

  const [newIcon, setNewIcon] = useState(false);

  const [feedIcon, setFeedIcon] = useState(false);

  const [downloadedIcon, setDownloadedIcon] = useState(false);

  const [isRegistered, setIsRegistered] = useState(true);

  const [reset, setReset] = useState(false);

  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();

  function onAuthStateChanged (user) {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;


  if(user) {
  return (
  <>
    <NavigationContainer>
      <PaperProvider theme={Theme}>
        <Tab.Navigator activeColor="white" color='' inactiveColor="lightgray"  barStyle={{backgroundColor: '#191616'}} labeled={false}>
          <Tab.Screen name="Home" listeners={{tabPress: () => {
                setGamesIcon(false);
                setNewIcon(false);
                setFeedIcon(false);
                setDownloadedIcon(false);
                if(!homeIcon) {
                  setHomeIcon(true);
                }
          }
        }} options={{
            tabBarIcon: ({color}) => (
                <Ionicons name={homeIcon ? "md-home" : "md-home-outline"} size={24} color={color}
            />
            )  
          }} component={Home} />
          <Tab.Screen name="Games" component={Games} listeners={{tabPress: () => {
              setHomeIcon(false);
              setNewIcon(false);
              setFeedIcon(false);
              setDownloadedIcon(false);
              if(!gamesIcon) {
                setGamesIcon(true);
              }
          }}} options={{
            tabBarIcon: ({color}) => (
              <Ionicons name={gamesIcon ? "game-controller" : "game-controller-outline"} size={24}color={color} />
            )
            
          }} />
          <Tab.Screen name="New" component={New} listeners={{tabPress: () => {
              setGamesIcon(false);
              setHomeIcon(false);
              setFeedIcon(false);
              setDownloadedIcon(false);
              if(!newIcon) {
                setNewIcon(true);
              }
          }}} options={{
            tabBarIcon: ({color}) => (
              <Ionicons name={newIcon ? "play-circle" : "play-circle-outline"} size={24} color={color} />
            )
          }} />
          <Tab.Screen name="Feed" component={Feed} listeners={{tabPress: () => {
              setGamesIcon(false);
              setNewIcon(false);
              setHomeIcon(false);
              setDownloadedIcon(false);
                if(!feedIcon) {
                  setFeedIcon(true);
                }
          }}} options={{
            tabBarIcon: ({color}) => (
              <Ionicons name={feedIcon ? 'happy' : "happy-outline"} size={24} color={color} />
            )
          }}/>
          <Tab.Screen name="Downloaded" component={Downloaded} listeners={{tabPress: () => {
              setGamesIcon(false);
              setNewIcon(false);
              setFeedIcon(false);
              setHomeIcon(false);
              if(!downloadedIcon) {
                setDownloadedIcon(true);
              }
          }}} options={{
            tabBarIcon: ({color}) => (
              <Ionicons name={downloadedIcon ? 'arrow-down-circle' : 'arrow-down-circle-outline'} size={24} color={color} />
            )
          }}/>
        </Tab.Navigator>
      </PaperProvider> 
    </NavigationContainer>
  </>
  );
  }
  else {
    if(!isRegistered) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor='transparent' translucent={true}/>
        <Register setIsRegistered={setIsRegistered} />
      </>
   
    )
    }
    else {
      if(reset) {
        return (
          <>
            <StatusBar barStyle="light-content" backgroundColor='transparent' translucent={true}/>
            <PasswordReset setReset={setReset} />
          </>
        )
      }
      else {
        return (
          <>
            <StatusBar barStyle="light-content" backgroundColor='transparent' translucent={true}/>
            <Login setIsRegistered={setIsRegistered} setReset={setReset} />
          </>
      )
      }
    }
  }
}

