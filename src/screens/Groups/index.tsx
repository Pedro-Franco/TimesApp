import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Header } from '@components/Header';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {

      const data = await groupsGetAll();
      setGroups(data);

    } catch (error) {
      
      console.log(error)

    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect (useCallback(() => {
    console.log("useFocusEffect executou");
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />

      <Highlight
        title='Times'
        subtitle='jogue com seu time'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item}
            onPress = {() => handleOpenGroup(item)}
          />
        )}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={groups.length === 0 && { flex: 1 }}

        ListEmptyComponent={() => (
          <ListEmpty 
            message="Não há times cadastrado !"
          />
        )}
      />

      <Button 
        title='Criar novo time'
        onPress={handleNewGroup}
      />
    </Container>
  );
}