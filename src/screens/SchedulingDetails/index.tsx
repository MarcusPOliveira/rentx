import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

export function SchedulingDetails() {
  const navigation = useNavigation<any>();

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate('SchedulingComplete');
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={['https://www.pngplay.com/wp-content/uploads/13/Audi-RS5-PNG-Free-File-Download.png']} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>Porshe</Brand>
            <Name>Panamera</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 Pessoas" icon={PeopleSvg} />
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle> DE </DateTitle>
            <DateValue> 18/06/22 </DateValue>
          </DateInfo>
          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle> DE </DateTitle>
            <DateValue> 18/06/22 </DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel> TOTAL </RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota> R$ 580 x3 diárias </RentalPriceQuota>
            <RentalPriceTotal> R$ 2.900,00 </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
