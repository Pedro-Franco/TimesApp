import { useState, useEffect, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, FlatList, TextInput } from 'react-native';

import { Input } from "@components/Input";
import { Button } from '@components/Button';
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { ButtonIcon } from "@components/ButtonIcon";

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetBygroup } from '@storage/player/playersGetByGroup';
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playersRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');

  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0){
      return Alert.alert ('Novo jogador', 'insira o nome do jogador');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');

      fetchPlayersByTeam();

    } catch (error) {
      
      if(error instanceof AppError){
        Alert.alert ('Novo jogador', error.message);
      }else {
        console.log(error);
        Alert.alert('Ñovo jogador', 'Não foi possível adicionar um jogador')
      }

    }

  }

  async function fetchPlayersByTeam(){
    
    try {
    
      const playersByTeam = await playersGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam);

    } catch (error) {
      
      console.log(error);
      Alert.alert('Jogadores', 'Não foi possível carregar as pessoas desse time');

    }

  }

  async function handlePlayerRemove(playerName: string){
    
    try {
      
      await playersRemoveByGroup(playerName, group);

      fetchPlayersByTeam();

    } catch (error) {
      
      console.log(error);

      Alert.alert('Remover jogador', 'não foi possível remover esse jogador');

    }

  }

  async function groupRemove(){

    try {
      
      await groupRemoveByName(group);
      navigation.navigate('groups');

    } catch (error) {
      
      console.log(error);
      Alert.alert('Remover grupo', 'Não foi possivel remover o grupo')

    }
    
  }

  async function handleGroupRemove(groupDelete: string){

    Alert.alert(
      'Remover grupo', 
      'Deseja remover este grupo ?', 
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()},
      ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return(
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle='Adiciona os jogadores e separe os times'
      />

      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome do jogador"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}

        showsVerticalScrollIndicator={false}

        ListEmptyComponent={() => (
          <ListEmpty 
            message="Não há jogadores nesse time !"
          />
        )}

        contentContainerStyle={[
          {paddingBottom: 100}, 
          players.length === 0 && {flex: 1}
        ]}
      />

      <Button 
        title= 'Remover Time'
        type= 'SECONDARY'
        onPress={handleGroupRemove}
      />

    </Container>
  );
}