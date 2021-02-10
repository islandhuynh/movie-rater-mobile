import React from 'react';
import Auth from './components/Auth';
import MovieList from './components/MovieList';
import Detail from './components/Detail';
import Edit from './components/Edit';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Auth: {screen: Auth},
  MovieList: {screen: MovieList},
  Detail: {screen: Detail},
  Edit: {screen: Edit}
})

const App = createAppContainer(AppNavigator)

export default App;
