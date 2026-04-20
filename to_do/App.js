import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Switch, Button, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Slider } from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TAREFAS = [
  { id: 'T1', nome: 'Ler edital PIC', desc: '...', img: 'img/pic.jpg', projetosVinculados: ['P1']},
  { id: 'T2', nome: 'Ver video aula de JavaScript', desc: '...', img: 'url', projetosVinculados: ['P2','P3']},
  { id: 'T3', nome: 'Ir na reunião de alinhamento', desc: '...', img: 'url', projetosVinculados: ['P3']},
  { id: 'T4', nome: 'Estudar PMBOK', desc: '...', img: 'url', projetosVinculados: ['P4']},
  { id: 'T5', nome: 'Treinar escalas maiores', desc: '...', img: 'url', projetosVinculados: ['P5']},
  { id: 'T6', nome: 'Ler documentação Expo', desc: '...', img: 'url', projetosVinculados: ['P2']},
];

const PROJETOS = [
  { id: 'P1', nome: 'Projeto de Pesquisa', desc: '...', img: 'url', tarefasVinculadas: ['T1']},
  { id: 'P2', nome: 'Projeto Mobile', desc: '...', img: 'url', tarefasVinculadas: ['T2', 'T6']},
  { id: 'P3', nome: 'Monitoria TI', desc: '...', img: 'url', tarefasVinculadas: ['T2']},
  { id: 'P4', nome: 'Gerenciamento de Projetos', desc: '...', img: 'url', tarefasVinculadas: ['T4']},
  { id: 'P5', nome: 'Aula de baixo', desc: '...', img: 'url', tarefasVinculadas: ['T5']},
]


function TelaInicial({ navigation }) {

  const renderItemTarefa = ({item}) => (

    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Tarefa', {idTarefa: item.id})}>
      <Text style={styles.nomeTarefa}>{item.nome}</Text>
      <Image source={{ uri: item.img }} style={styles.imagem} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        <StatusBar style="auto" />

        <FlatList //lista
        data={TAREFAS} //dados das tarefas
        keyExtractor={item => item.id} //identificador único
        renderItem={renderItemTarefa} //como desenha cada linha
        />
      </View>
  );
}

function TelaProjeto() {
  return (
    pass
  );
}

function TelaTarefa({route, navigation}) {
  // pegar o id que veio da navegação
  const { idTarefa } = route.params;
  //procurar a tarefa inteira no no array global
  const tarefa = TAREFAS.find(t => t.id === idTarefa);
  //se não achar, retornar aviso
  if (!tarefa) return <Text>Tarefa não encontrada</Text>;


  // Estados para edição (iniciam com os dados atuais da tarefa)
  const [nomeEditado, setNomeEditado] = useState(tarefa.nome);
  const [descEditada, setDescEditada] = useState(tarefa.desc);

  const [status, setStatus] = useState('A fazer');
  const [progresso, setProgresso] = useState(0);
  const [isUrgente, setUrgente] = useState(false); // para o switch

  return (
    <ScrollView style={styles.container}>
    
      <Text style={styles.title}>{tarefa.nome}</Text>
      <Image source={{ uri: tarefa.img }} style={styles.imagemGrande} />

      <Picker
      selectedValue={status}
      onValueChange={(itemValue) => setStatus(itemValue)}>

        <Picker.Item label="A fazer" value="A fazer"/>
        <Picker.Item label="Fazendo" value="fazendo" />
        <Picker.Item label="Feito" value="feito" />
      </Picker>
      
      <View style={styles.row}>
      <Text>Tarefa Urgente?</Text>
      <Switch 
       value={isUrgente} 
       onValueChange={setUrgente} 
      />
      </View>

      <Text style={styles.label}>Progresso: {Math.round(progresso)}%</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={progresso}
        onValueChange={setProgresso}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
      />
    </ScrollView>
  );
}

export default function App() {
  return (
  //Container para navegação
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={TelaInicial}/>
      <Stack.Screen name="Projeto" component={TelaProjeto}/>
      <Stack.Screen name="Tarefa" component={TelaTarefa}/>

    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20, 
    textAlign:'center'
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row', // Alinha os itens em linha (horizontal)
    justifyContent: 'space-between', // Empurra o texto para a esquerda e a imagem para a direita
    alignItems: 'center', // Centraliza os itens verticalmente dentro do card
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    // Sombra para dar o efeito de card (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
  },
  nomeTarefa: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1, // Garante que o texto ocupe o espaço disponível antes da imagem
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 15,
  },
});
