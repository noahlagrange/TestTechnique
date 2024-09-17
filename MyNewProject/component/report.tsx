import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import {Dimensions } from 'react-native';
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { useRef, useEffect } from 'react';
import {
  BarChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    SVGRenderer,
    // ...
    BarChart,
  ])
  
  const E_HEIGHT = 250;
  const E_WIDTH = 300;
  
  // Initialize
  function ChartComponent({ option }) {
    const chartRef = useRef<any>(null);
  
    useEffect(() => {
      let chart: any;
      if (chartRef.current) {
        // @ts-ignore
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
const GET_REPORT = gql`
  query GetReport($deviceId: String!) {
    findAllbyDeviceId(deviceid: $deviceId) {
      id
      temperature
      deviceId
    }
  }
`;

const ReportPage = () => {
  const route = useRoute();
  const { deviceId } = route.params;

  const { loading, error, data } = useQuery(GET_REPORT, {
    variables: { deviceId },
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const temp = data.findAllbyDeviceId.map(report => report.temperature)
  const len = Array.from({ temp }, (_, index) => index + 1);

  const option = {
    xAxis: {
      type: 'category',
      data: len,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: temp,
        type: 'bar',
      },
    ],
  }
  return <ChartComponent option={option} />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ReportPage;
