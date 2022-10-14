import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Container, Content, Icon } from "./styles";

import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from '@components/Input';

export function NewGroup() {

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title='Novo time'
          subtitle='crie seu time para adicionar jogadores'
        />

        <Input
          placeholder="Nome do time"
          onChangeText={setGroup}
        />

        <Button 
          title='criar'
          style={{ marginTop: 24}}
          onPress={handleNew}
        />

      </Content>
    </Container>
  );
}