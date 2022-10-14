import { useState } from 'react'
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from '@components/PlayerCard';
import { Highlight } from "@components/Highlight";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Input } from "@components/Input";


import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {

  const [team, setTeam] = useState('Time A');

  const [players, setPlayers] = useState(['kboredamontanha', 'VmZ100MiR4', 'Rennkyz', 'ZeptoAngelz', 'slaapgames']);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle='Adiciona os jogadores e separe os times'
      />

      <Form>
        <Input 
          placeholder="Nome do jogador"
          autoCorrect={false}
        />

        <ButtonIcon 
          icon='add'
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={ item => item }
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item}
            onRemove={() => {}}
          />
        )}
      />

    </Container>
  );
}