import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Circle, G, Svg, Text } from 'react-native-svg';
import { BLACK } from '../color';

const CircularProgressBar = ({ percentage }) => {
  // 원의 반지름
  const radius = 30;

  // 원의 중심 좌표
  const centerX = radius + 5; // X 좌표
  const centerY = radius + 5; // Y 좌표

  // 원의 둘레
  const circumference = 2 * Math.PI * radius;

  // 원의 시작 각도 (12시 방향이 0도)
  const startAngle = -Math.PI / 2;

  // 퍼센티지에 따른 끝 각도 계산
  const endAngle = startAngle + (percentage / 100) * (2 * Math.PI);

  return (
    <View style={styles.container}>
      <Svg width={2 * (radius + 5)} height={2 * (radius + 5)}>
        <G>
          {/* 배경 원 */}
          <Circle
            r={radius}
            cx={centerX}
            cy={centerY}
            fill="none"
            stroke="#ddd"
            strokeWidth={10}
          />
          {/* 원형 그래프 */}
          <Circle
            r={radius}
            cx={centerX}
            cy={centerY}
            fill="none"
            stroke="#007AFF" // 원형 그래프의 색상
            strokeWidth={10} // 원형 그래프의 두께
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={circumference - (percentage / 100) * circumference}
          />
          {/* 텍스트 */}
          <Text
            x={centerX - 7}
            y={centerY + 5} // 텍스트 위치 조절
            fontSize="15"
            textAnchor="middle"
            fill={BLACK} // 텍스트 색상
          >
            {percentage}%
          </Text>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:10,
  },
});

export default CircularProgressBar;
