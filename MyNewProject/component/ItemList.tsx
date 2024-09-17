import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { GET_ITEMS, LATEST_REPORTS_QUERY } from '../request/GraphqlRequest';

const ItemList = () => {
  const navigation = useNavigation();
  
  const { loading: itemsLoading, error: itemsError, data: itemsData } = useQuery(GET_ITEMS);

  const deviceIds = itemsData ? itemsData.items.map(item => item.id) : [];

  const { loading: reportsLoading, error: reportsError, data: reportsData } = useQuery(LATEST_REPORTS_QUERY, {
    variables: { deviceIds },
    skip: !deviceIds.length,
  });

  if (itemsLoading || reportsLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (itemsError || reportsError) return <Text>Error: {itemsError?.message || reportsError?.message}</Text>;

  const latestReports = new Map();
  reportsData?.latestReportsByDeviceIds.forEach(report => {
    latestReports.set(report.deviceId, report);
  });

  const renderItem = ({ item }) => {
    const latestReport = latestReports.get(item.id);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ReportPage', { deviceId: item.id })}>
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          {latestReport && (
            <View style={styles.report}>
              <Text style={styles.temperature}>Temp: {latestReport.temperature}°C</Text>
              <Text style={styles.date}>Date: {new Date(latestReport.date).toLocaleDateString()}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsData.items}
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
  report: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: 16,
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default ItemList;
