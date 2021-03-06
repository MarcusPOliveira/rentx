import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { format, parseISO } from 'date-fns';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
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

interface Params {
  car: CarDTO,
  dates: string[]
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const theme = useTheme();

  const rentTotal = Number(dates.length * car.price);

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRental() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates, //datas já agendadas
      ...dates //datas selecionadas
    ];

    setLoading(true);
    await api.post('schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(parseISO(dates[0]), 'dd/MM/yyyy'),
      endDate: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy'),
    })

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    }).then(response => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel!`
      });
    }).catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento')
    })
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(parseISO(dates[0]), 'dd/MM/yyyy'),
      end: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy'),
    })
  }, []);

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
            <Brand>{car.brand}</Brand>
            <Name> {car.name} </Name>
          </Description>
          <Rent>
            <Period> {car.period} </Period>
            <Price>R$ {car.price} </Price>
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
            <DateValue> {rentalPeriod.start} </DateValue>
          </DateInfo>
          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle> ATÉ </DateTitle>
            <DateValue> {rentalPeriod.end} </DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel> TOTAL </RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota> {`R$ ${car.price} x${dates.length} diárias`} </RentalPriceQuota>
            <RentalPriceTotal> R$ {rentTotal} </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
