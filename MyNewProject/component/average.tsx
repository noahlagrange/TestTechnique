import React from 'react';
import { View, Text} from 'react-native';

const Average = ({ record }) => {

  
    const calculateAverageTemperature = (record: number[]): string => {
        if (record.length === 0) return '0.00';
        const sum = record.reduce((acc, temp) => acc + temp, 0);
        const average = sum / record.length;
        return average.toFixed(2); 
      };
    const getSmallestValue = (numbers: number[]): number => {
        if (numbers.length === 0) return 0;
        return Math.min(...numbers);
    };
    const getHighestValue = (numbers: number[]): number => {
        if (numbers.length === 0) return 0;
        return Math.max(...numbers);
    };
  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 20 }}>
  <View style={{ alignItems: 'center', padding: 10 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Temperature average</Text>
    <Text style={{ marginTop: 10 }}>{calculateAverageTemperature(record)}°C</Text>
  </View>

  <View style={{ alignItems: 'center', padding: 10 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Max Temperature</Text>
    <Text style={{ marginTop: 10 }}>{getHighestValue(record)}°C</Text>
  </View>

  <View style={{ alignItems: 'center', padding: 10 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Min Temperature</Text>
    <Text style={{ marginTop: 10 }}>{getSmallestValue(record)}°C</Text>
  </View>
</View>


  );
};

export default Average;
