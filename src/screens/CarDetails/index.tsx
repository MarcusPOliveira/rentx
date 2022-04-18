import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler, //usada para identificar quando o usuário faz movimento de scroll
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer
} from './styles';

//tipando parametros que vem de uma tela para outra
interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const theme = useTheme();

  const { car } = route.params as Params;

  //animações
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car
    });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent />
      <Animated.View
        style={[headerStyleAnimation, styles.header, { backgroundColor: theme.colors.background_secondary }]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View >
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
      >
        <Details>
          <Description>
            <Brand> {car.brand} </Brand>
            <Name> {car.name} </Name>
          </Description>
          <Rent>
            <Period> {car.rent.period} </Period>
            <Price> R$ {car.rent.price} </Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>
        <About> {car.about} </About>
      </Animated.ScrollView>
      <Footer>
        <Button title="Escolha período de aluguel" color={theme.colors.main} onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
