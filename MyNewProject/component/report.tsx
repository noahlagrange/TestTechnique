import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  BarChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { GET_REPORT } from '../request/GraphqlRequest';
import ItemDetails from './detail';
import Average from './average';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  BarChart,
])

const E_HEIGHT = 250;
const E_WIDTH =  Dimensions.get('window').width;;

function ChartComponent({ option }) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);
  return <SvgChart ref={chartRef} />;
}

export default function ReportPage() {
    const route = useRoute();
    const { deviceId } = route.params;
  
    const { loading, error, data } = useQuery(GET_REPORT, {
      variables: { deviceId },
    });
  
    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error.message}</Text>;
  
    const reports = data?.FindAllbyDeviceId || [];
    const temperatures = reports.map(report => report.temperature);
    const dates = reports.map(report => new Date(report.date).toLocaleDateString());
  
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}°C',
          },
      xAxis: {
        type: 'category',
        data: dates, 
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: temperatures,
          type: 'bar',
        },
      ],
    };
  
    return (
      <View style={styles.container}>
        <ItemDetails itemId={deviceId} />
        <Text style={styles.header}>Temperature Report</Text>
        <ChartComponent option={option} />
        <Average record={temperatures}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });