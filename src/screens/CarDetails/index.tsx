import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
  Price
} from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
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
      </Content>
    </Container>
  );
}
