import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  car: CarDTO;
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        console.log(response.data)
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title> Seus agendamentos {'\n'} estão aqui </Title>
        <Subtitle> Conforto, segurança e praticidade </Subtitle>
      </Header>
      {
        loading ? <LoadAnimation /> :
          <Content>
            <Appointments>
              <AppointmentsTitle> Agendamentos feitos </AppointmentsTitle>
              <AppointmentsQuantity> {cars.length} </AppointmentsQuantity>
            </Appointments>
            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) =>
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle> Período </CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate> {item.startDate} </CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate> {item.endDate} </CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              }
            />
          </Content>
      }
    </Container>
  );
}
