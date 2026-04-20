import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Switch, Button, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TAREFAS = [
  { id: 'T1', nome: 'Ler edital PIC', desc: '...', img: require('./assets/pic.jpg'), projetosVinculados: ['P1']},
  { id: 'T2', nome: 'Ver video aula de JavaScript', desc: '...', img: require('./assets/javascript.jpg'), projetosVinculados: ['P2','P3']},
  { id: 'T3', nome: 'Ir na reunião de alinhamento', desc: '...', img: require('./assets/meeting.jpg'), projetosVinculados: ['P3']},
  { id: 'T4', nome: 'Estudar PMBOK', desc: '...', img: require('./assets/pmbok.jpg'), projetosVinculados: ['P4']},
  { id: 'T5', nome: 'Treinar escalas maiores', desc: '...', img: require('./assets/scales.jpg'), projetosVinculados: ['P5']},
  { id: 'T6', nome: 'Ler documentação Expo', desc: '...', img: require('./assets/reading.jpg'), projetosVinculados: ['P2']},
];

const PROJETOS = [
  { id: 'P1', nome: 'Projeto de Pesquisa', desc: '...', img: require('./assets/project.jpg'), tarefasVinculadas: ['T1']},
  { id: 'P2', nome: 'Projeto Mobile', desc: '...', img: require('./assets/mobile.jpg'), tarefasVinculadas: ['T2', 'T6']},
  { id: 'P3', nome: 'Monitoria TI', desc: '...', img: require('./assets/monitoria.png'), tarefasVinculadas: ['T2']},
  { id: 'P4', nome: 'Gerenciamento de Projetos', desc: '...', img: require('./assets/management.jpg'), tarefasVinculadas: ['T4']},
  { id: 'P5', nome: 'Aula de baixo', desc: '...', img: require('./assets/bass.jpg'), tarefasVinculadas: ['T5']},
]


function TelaInicial({ navigation }) {
  return (
    <ScrollView style={styles.containerScroll}>
      <StatusBar style="auto" />
      
      {/* SEÇÃO 1: TAREFAS */}
      <Text style={styles.secaoTitle}>Todas as Tarefas</Text>
      {TAREFAS.map((item) => (
        <TouchableOpacity 
          key={item.id}
          style={styles.card} 
          onPress={() => navigation.navigate('Tarefa', {idTarefa: item.id})}
        >
          {/* A imagem vem ANTES do texto agora, para ficar na esquerda! */}
          <Image source={item.img} style={styles.imagem} />
          <Text style={styles.nomeTarefa}>{item.nome}</Text>
        </TouchableOpacity>
      ))}

      {/* SEÇÃO 2: PROJETOS */}
      <Text style={[styles.secaoTitle, { marginTop: 20 }]}>Projetos</Text>
      {PROJETOS.map((item) => (
        <TouchableOpacity 
          key={item.id}
          style={styles.card} 
          onPress={() => navigation.navigate('Projeto', {idProjeto: item.id})}
        >
          <Image source={item.img} style={styles.imagem} />
          <Text style={styles.nomeTarefa}>{item.nome}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function TelaProjeto({ route, navigation }) {
  const { idProjeto } = route.params;
  const projeto = PROJETOS.find(p => p.id === idProjeto);

  // Aqui nós filtramos as tarefas que pertencem a este projeto específico
  const tarefasDesteProjeto = TAREFAS.filter(t => projeto.tarefasVinculadas.includes(t.id));

  // + 2 inputs para completar os 4 exigidos pelo trabalho
  const [nomeProj, setNomeProj] = useState(projeto.nome);
  const [descProj, setDescProj] = useState(projeto.desc);

  return (
    <ScrollView style={styles.containerScroll}>
      {/* Imagem como um banner no topo */}
      <Image source={projeto.img} style={styles.imagemGrandeProjeto} />
      
      <TextInput 
        style={styles.titleDetails} 
        value={nomeProj} 
        onChangeText={setNomeProj} 
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput 
        style={styles.inputEditavel} 
        value={descProj} 
        onChangeText={setDescProj} 
        multiline 
      />

      {/* Lista de tarefas vinculadas ao projeto */}
      <Text style={[styles.secaoTitle, { marginTop: 30 }]}>Tarefas</Text>
      {tarefasDesteProjeto.map(tarefa => (
        <TouchableOpacity 
          key={tarefa.id} 
          style={styles.card} 
          onPress={() => navigation.navigate('Tarefa', {idTarefa: tarefa.id})}
        >
          <Image source={tarefa.img} style={styles.imagem} />
          <Text style={styles.nomeTarefa}>{tarefa.nome}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function TelaTarefa({route, navigation}) {
  const { idTarefa } = route.params;
  const tarefa = TAREFAS.find(t => t.id === idTarefa);

  // 1. REGRAS DOS HOOKS: Todos os 'useState' DEVEM vir antes de qualquer 'return'
  // Usamos tarefa?.nome para o app não quebrar caso a tarefa não seja encontrada na hora de carregar a tela
  const [nomeEditado, setNomeEditado] = useState(tarefa?.nome || '');
  const [descEditada, setDescEditada] = useState(tarefa?.desc || '');
  const [status, setStatus] = useState('A fazer');
  const [progresso, setProgresso] = useState(0);
  const [isUrgente, setUrgente] = useState(false);

  // 2. Agora sim, podemos colocar o aviso se a tarefa não existir!
  if (!tarefa) return <Text style={{marginTop: 50, textAlign: 'center'}}>Tarefa não encontrada</Text>;


  return (
    <ScrollView style={styles.containerScroll}>
      
      {/* Cabeçalho da Tarefa */}
      <View style={styles.headerTarefa}>
        <TextInput 
          style={styles.titleDetails} 
          value={nomeEditado} 
          onChangeText={setNomeEditado} 
          multiline
        />
        <Image source={tarefa.img} style={styles.imagemGrandeTarefa} />
      </View>

      <Text style={styles.label}>Descrição</Text>
      <TextInput 
        style={styles.inputEditavel} 
        value={descEditada} 
        onChangeText={setDescEditada} 
        multiline 
      />

      <Picker selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
        <Picker.Item label="A fazer" value="A fazer"/>
        <Picker.Item label="Fazendo" value="fazendo" />
        <Picker.Item label="Feito" value="feito" />
      </Picker>
      
      <View style={styles.row}>
        <Text>Tarefa Urgente?</Text>
        <Switch value={isUrgente} onValueChange={setUrgente} />
      </View>

      <Text style={styles.label}>Progresso: {Math.round(progresso)}%</Text>
      <Slider
        minimumValue={0} maximumValue={100} value={progresso} onValueChange={setProgresso}
        minimumTrackTintColor="#1EB1FC" maximumTrackTintColor="#d3d3d3"
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
  containerScroll: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20, // Dá aquele respiro nas bordas igual ao mockup
  },
  secaoTitle: {
    color: 'black',
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row', 
    alignItems: 'center', // Centraliza verticalmente
    padding: 15,
    marginBottom: 15, // Espaçamento entre os cards
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nomeTarefa: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1, 
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15, // MUDAMOS PARA marginRight: empurra o texto para a direita
  },
  // --- Novos estilos para as telas de detalhes ---
  headerTarefa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  imagemGrandeTarefa: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imagemGrandeProjeto: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  titleDetails: {
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1, // Para não invadir o espaço da imagem
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textDecorationLine: 'underline', // O sublinhado que você colocou em "Descrição"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  inputEditavel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  }
});