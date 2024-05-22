import React, {useState} from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import { styles } from "./styles";

import { Participant } from "../../components/Participant";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');


  function handParticipantAdd() {
    if(participants.includes(participantName)){
      return Alert.alert("Participante Existe", "Já exise um participante com esse nome na lista.")
    }

    if(participantName == ''){
      return Alert.alert("Favor inserir um nome para adicionar")
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
    console.log(participants);
  }

  function handParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`,[
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

    console.log(`Você clicou para remover ${name}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Domingo, 19 de Maio de 2024.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handParticipantAdd}>
          <Text style={styles.butonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key={item}
            name={item}
            onRemove={() => handParticipantRemove(item)} 
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  );
}
