import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playersGetBygroup } from './playersGetByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
  try {

    /*
    Lógica...

    @ignite-team:players-ignite: []
    @ignite-team:players-Rocket: []
    @ignite-team:players-Amigos: []

    */

    const storedPlayers = await playersGetBygroup(group);

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está em um time aqui.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

  } catch (error) {

    throw (error);

  }
}