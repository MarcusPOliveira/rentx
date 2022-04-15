import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { format, parseISO } from 'date-fns';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import { BackButton } from '../../components/BackButton';
import { Calendar, DayProps, MarkedDateProps, generateInterval } from '../../components/Calendar';
import { Button } from '../../components/Button';
import ArrowSvg from '../../assets/arrow.svg';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const route = useRoute();
  const { car } = route.params as Params;
  const navigation = useNavigation<any>();

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    //se o timestamp é vazio, pega a data selecionada. Caso timestamp não seja vazio, vai armazenar no estado de ultima data selecionada
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    //manipulação do intervalo para que a menor data seja a primeira e a maior seja sempre a útlima
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
      startFormatted: format(parseISO(firstDate), 'dd/MM/yyyy'),
      endFormatted: format(parseISO(endDate), 'dd/MM/yyyy'),
    })
  }

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title> Escolha uma {'\n'} data de início e {'\n'} fim do aluguel </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle> DE </DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted} > {rentalPeriod.startFormatted} </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle> ATÉ </DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted} > {rentalPeriod.endFormatted}  </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      <Footer>
        <Button
          title='Confirmar'
          color={theme.colors.main}
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
