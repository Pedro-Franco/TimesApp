import { useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError';
import { useState } from 'react';

import { Container, Content, Icon } from "./styles";

import { groupCreate } from '@storage/group/groupCreate';
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from '@components/Input';
import { Alert } from 'react-native';

export function NewGroup() {

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew() {

    try {

      if (group.trim().length === 0) {
        return Alert.alert('Novo Time', 'Informe o nome do time');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {

      if(error instanceof AppError){
        Alert.alert('Criar time', error.message);
      } else {
        Alert.alert('Criar time', 'Não foi possível criar um novo time');
        console.log(error);
      }
      
    }
    
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