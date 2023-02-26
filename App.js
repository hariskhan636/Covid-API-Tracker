import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Drawer.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#c00700',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
    >
        <Drawer.Screen name="World Statistics" component={WorldStats} />
        <Drawer.Screen name="Country Statistics" component={CountryStats} />
        <Drawer.Screen name="Favourites" component={Favourites} />
      </Drawer.Navigator> 
    </NavigationContainer>
  );

  function WorldStats({ navigation }) {

      const [data, setData] = useState();
      const [load, setLoad] = useState(false);
      
      //setCon(((data[0].confirmed)/7794798739)*100)

      console.log(data)

      useEffect(() => {
        getData();

      },[]);

      
      const getData = async() => {
        try{
        let response = await fetch('https://covid-19-data.p.rapidapi.com/totals', {
        "method": "GET",
        "headers": {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': '42b6e9bdc0mshd29dee33dab4446p17ba93jsne10ae25f6121'
        }})
        let res = await response.json()
        setData(res)
        setLoad(true)
        } 
        catch (error) {
          console.error(error);
        }
        
      }

      return (
      <View style={styles.screen}>
        {load===false?<Text>Loading</Text>:
        <View>
          <Text style={styles.text}>Confirmed: {data[0].confirmed}</Text>
          <Text style={styles.text}>Recovered: {data[0].recovered}</Text>
          <Text style={styles.text}>Critical: {data[0].critical}</Text>
          <Text style={styles.text}>Deaths: {data[0].deaths}</Text>
          <Text style={styles.text}>Last Change: {data[0].lastChange}</Text>
          <Text style={styles.text}>Last Change: {data[0].lastChange}</Text>
        </View>
        }
      </View>
      );
  }

  function CountryStats({ navigation }) {
    
      const [data, setData] = useState();
      const [load, setLoad] = useState(false);

      console.log(data)

      useEffect(() => {
        getData();

      },[]);

       const getData = async() => {
        try{
        let response = await fetch('https://world-population.p.rapidapi.com/allcountriesname', {
        "method": "GET",
        "headers": {
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
            'x-rapidapi-key': '42b6e9bdc0mshd29dee33dab4446p17ba93jsne10ae25f6121'
        }})
        let res = await response.json()
        setData(res)
        setLoad(true)
        } 
        catch (error) {
          console.error(error);
        }
        
      }

      return (
      <View style={styles.screen}>
        {load===false?<Text>Loading</Text>:
        <View>
          <Text style={styles.text}>{data}</Text>
        </View>
        }
      </View>
      );
  }

  function Favourites({ navigation }) { 
    return (
      <View style={styles.screen}>
      
      </View>
    );
  }

}


const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'black'
  },
  text: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white'
  },
});

