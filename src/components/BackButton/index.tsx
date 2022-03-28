import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';


import {
  Container
} from './styles';

//cor dinâmica para btn de cada tela
interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name='chevron-left'
        size={24}
        color={color ? color : theme.colors.text} //tem conteudo na cor? Se tem, mostrar essa cor. Caso nao tenha, cor de text do theme.ts
      />
    </Container>
  );
}
