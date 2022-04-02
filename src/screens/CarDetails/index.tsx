import React from 'react';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import {
  Container,
  Header,
  CarImages,
  Content,
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

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
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
      </Content>
      <Footer>
        <Button title="Escolha período de aluguel" color={theme.colors.main} onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
