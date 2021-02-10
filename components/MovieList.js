import React, { useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { server } from '../config/config';

export default function MovieList(props) {

  const [movies, setMovies] = useState([]);
  const [tokenValue, setTokenValue] = useState('');

  let token = null;

  const getData = async () => {
    token = await AsyncStorage.getItem('MR_Token');
    if (token) {
      getMovies();
    } else {
      props.navigation.navigate("Auth");
    }
  }

  useEffect(() => {
    getData()
  }, []);

  const getMovies = () => {
    fetch(`http://${server}/api/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(res => res.json())
    .then(res => setMovies(res))
    .then(setTokenValue(token))
    .catch(err => console.log(err));
  }

  const movieClicked = (movie) => {
    props.navigation.navigate("Detail", {movie: movie, title: movie.title, token: tokenValue})
  }

  return (
    <View>
      <Image source={(require('../assets/mr_logo.png'))}
        style={{width: '100%', height: 110, paddingTop: 30}}
        resizeMode="contain"
      />
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => movieClicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      /> 
      <Button title="Add New" onPress={() => props.navigation.navigate("Edit", { movie: {title: '', description: ''}, token: tokenValue})}/>
    </View>
  );
}

MovieList.navigationOptions = screenProps => ({
  title: "List of movies",
  headerStyle: {
      backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35'
  },
  itemText: {
    color: '#fff',
    fontSize: 24
  }
});
