import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

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

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
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
  }

  function handleConfirm() {
    navigation.navigate('SchedulingDetails');
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
            <DateValue selected={false} > 29/03/2022 </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle> ATÉ </DateTitle>
            <DateValue selected={true} > 29/03/2022  </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar
          markedDates={{}}
          onDayPress={handleChangeDate}
        />
      </Content>
      <Footer>
        <Button
          title='Confirmar'
          color={theme.colors.main}
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}
