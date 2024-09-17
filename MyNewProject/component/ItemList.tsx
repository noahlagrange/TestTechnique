import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const GET_ITEMS = gql`
  query {
    items {
      id
      name
      description
    }
  }
`;

const ItemList = () => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReportPage', { deviceId: item.id })}>
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: Dimensions.get('window').width,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    flex: 1,
    textAlign: 'right',
    color: '#666',
  },
});

export default ItemList;
