import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { View, Text, ActivityIndicator } from 'react-native';
import { GET_ITEM } from '../request/GraphqlRequest';

const ItemDetails = ({ itemId }) => {
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { id: itemId },
  });
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;
  const { item } = data;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Name: {item.name}</Text>
      <Text style={{ marginTop: 10 }}>Description: {item.description}</Text>
    </View>
  );
};

export default ItemDetails;
