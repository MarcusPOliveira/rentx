import React from 'react';
import { StatusBar, Button, View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

// useSharedValue comunicação/compartilhamento entre as animações
// useAnimatedStyle anima o comportamento visual dos elementos

import {
  Container
} from './styles';

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animation.value }
      ]
    }
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * 500;
  }

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent />
      <Animated.View style={[animatedStyles, { width: 100, height: 100, backgroundColor: 'red' }]} >
        <Text> Estou aqui </Text>
      </Animated.View>
      <Button title="mover" onPress={handleAnimationPosition} />
    </Container>
  );
}
