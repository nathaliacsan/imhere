import { useState } from 'react'

import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    Alert 
        } from 'react-native'

import { Participant } from '../../components/Participant'

import { styles } from './styles'

export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

function handleParticipantAdd() {
    if(participants.includes(participantName)) {
        // Primeira posição: titulo,
        // Segunda posição: mensagem,
        // Terceira posição: propriedades
       return Alert.alert("Participante existe",
        "Já existe um participante na lista com esse nome.")
    }

    // prevState para não perder o estado ATUAL e sim
    // só adicionar a Ana na lista
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
}

function handleParticipantRemove(name: string) {
        
    // Primeira posição: titulo,
    // Segunda posição: mensagem,
    // Terceira posição: propriedades
    Alert.alert("Remover", `Remover o participante ${name}?`, [
        {
            text: 'Sim',
            onPress: () => 
            // Estado atual, filtre todos os participantes diferentes do name
            setParticipants(prevState => prevState.filter(participant => participant !== name))
        },
        {
            text: 'Não',
            style: 'cancel'
        }
    ])
    
}

  return (
   <View style={styles.container}>
    <Text style={styles.eventName}> 
        Nome do evento
    </Text>

    <Text style={styles.eventDate}> 
        Sexta, 4 de Novembro de 2022.
    </Text>

    <View style={styles.form}>
        <TextInput 
            style={styles.input}
            placeholder="Nome do participante"
            placeholderTextColor="#6B6B6B"
            onChangeText={setParticipantName}
            // Mesma coisa que: onChangeText={text => setParticipantName(text)}
            value={participantName}
        />

        <TouchableOpacity 
            style={styles.button} 
            onPress={handleParticipantAdd}
        >
            <Text style={styles.buttonText}>
                +
            </Text>
        </TouchableOpacity>
    </View>


    {/* ScrollView carrega TODOS os componentes, até os que nao 
    estao sendo exibidos */}
    {/* Flatlist para listas grandes */}
    <FlatList
        //data={participants} 
        data={participants} 
        keyExtractor={item => item}
        renderItem={({item}) => (
            <Participant  
                key={item}
                name={item}
                onRemove={() => handleParticipantRemove(item)}
            />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
                Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
            </Text>
        )}
    />
  
   
    
   </View>
  )
}