import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, AsyncStorage } from 'react-native';
import { ipAddress } from '../config/config';

export default function Edit(props) {

    // gets parameter from parent through navigation
    const movie = props.navigation.getParam('movie', null);
    const token = props.navigation.getParam('token', '');

    const [ title, setTitle] = useState(movie.title);
    const [ description, setDescription] = useState(movie.description);

    const saveMovie = () => {

        if (movie.id) {
            fetch(`http://${ipAddress}:8000/api/movies/${movie.id}/`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description})
            })
            .then(res => res.json())
            .then(movie => {
                props.navigation.navigate("Detail", {movie: movie, title: movie.title})
            })
            .catch(err => console.log(err));
        } else {
            fetch(`http://${ipAddress}:8000/api/movies/`, {
                method: 'POST',
                headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description})
            })
            .then(res => res.json())
            .then(res => {
                props.navigation.navigate("MovieList")
            })
            .catch(err => console.log(err));
        }

        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                value={description}
            />
            <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"}/>
        </View>
    );
}

Edit.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },
    headerRight: () => <Button 
    title="Remove" 
    onPress={() => removeClicked(screenProps)}
/>
})

const removeClicked = props => {
    const movie = props.navigation.getParam("movie");
    const token = props.navigation.getParam("token");

    fetch(`http://${ipAddress}:8000/api/movies/${movie.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
    })
    .then(props.navigation.navigate("MovieList"))
    .catch(err => console.log(err));
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    description: {
        fontSize: 20,
        padding: 10,
        color: 'white'
    },
    input: {
        fontSize: 24,
        backgroundColor: "white",
        padding: 10,
        margin: 10
    },
    label: {
        fontSize: 24,
        color: 'white',
        padding: 10
    }
  });
  