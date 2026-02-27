import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { PricePoint } from '../../types/stock';
import { COLORS } from '../../constants/theme';

interface PriceLineChartProps {
  data: PricePoint[];
  width?: number;
  height?: number;
  color?: string;
  showGradient?: boolean;
}

export default function PriceLineChart({
  data,
  width = Dimensions.get('window').width * 0.88 - 32,
  height = 120,
  color,
  showGradient = true,
}: PriceLineChartProps) {
  const chartColor = useMemo(() => {
    if (color) return color;
    if (data.length < 2) return COLORS.accent;
    return data[data.length - 1].price >= data[0].price ? COLORS.positive : COLORS.negative;
  }, [data, color]);

  const { points, areaPath } = useMemo(() => {
    if (data.length < 2) return { points: '', areaPath: '' };

    const prices = data.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const pad = 8;
    const chartWidth = width - pad * 2;
    const chartHeight = height - pad * 2;

    const coords = data.map((d, i) => {
      const x = pad + (i / (data.length - 1)) * chartWidth;
      const y = pad + chartHeight - ((d.price - minPrice) / priceRange) * chartHeight;
      return { x, y };
    });

    const linePoints = coords.map((c) => `${c.x},${c.y}`).join(' ');

    // Area path: line down to bottom-right, across to bottom-left, up
    const firstPoint = coords[0];
    const lastPoint = coords[coords.length - 1];
    const bottomY = height - pad;

    const areaPoints = [
      `M ${firstPoint.x},${firstPoint.y}`,
      ...coords.slice(1).map((c) => `L ${c.x},${c.y}`),
      `L ${lastPoint.x},${bottomY}`,
      `L ${firstPoint.x},${bottomY}`,
      'Z',
    ].join(' ');

    return { points: linePoints, areaPath: areaPoints };
  }, [data, width, height]);

  if (data.length < 2) return <View style={{ width, height }} />;

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={chartColor} stopOpacity="0.3" />
            <Stop offset="1" stopColor={chartColor} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        {showGradient && areaPath ? (
          <Path d={areaPath} fill="url(#areaGradient)" />
        ) : null}
        {points ? (
          <Polyline
            points={points}
            fill="none"
            stroke={chartColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
});
