import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import ItemList from './component/ItemList';
import ReportPage from './component/report';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://172.20.10.6:3000/graphql',
    headers: {
      'Content-Type': 'application/json',
      'x-apollo-operation-name': 'operationName',
    },
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ItemList">
          <Stack.Screen name="ItemList" component={ItemList} options={{ title: 'Items' }} />
          <Stack.Screen name="ReportPage" component={ReportPage} options={{ title: 'Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
