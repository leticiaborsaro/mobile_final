import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Switch, Button, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TAREFAS = [
  { id: 'T1', 
    nome: 'Ler edital PIC (TÍTULO EDITÁVEL)', 
    desc: 'Leitura completa e cuidadosa do edital do Projeto de iniciação científica. (EDITÁVEL)', 
    img: require('./assets/pic.jpg'), 
    projetosVinculados: ['P1'],
    estado: 'Fazendo',
    progresso: 97,
    isUrgente: true
  },
  { id: 'T2', 
    nome: 'Ver video aula de JavaScript', 
    desc: 'Aprender fundamentos de JavaScript através de videoaulas gratuitas no Youtube...(EDITÁVEL)', 
    img: require('./assets/javascript.jpg'), 
    projetosVinculados: ['P2','P3'],
    estado: 'A Fazer',
    progresso: 0,
    isUrgente: false
  },
  { id: 'T3', 
    nome: 'Ir na reunião de alinhamento', 
    desc: 'Participar da reunião de alinhamento da Monitoria do CEUB para compreender os próximos passos dentro do projeto...(EDITÁVEL)', 
    img: require('./assets/meeting.jpg'), 
    projetosVinculados: ['P3'],
    estado: 'A Fazer',
    progresso: 34,
    isUrgente: true
  },
  { id: 'T4', 
    nome: 'Estudar PMBOK', 
    desc: 'Estudar a versão mais recente do Project Management Body Of Knowledge para a matéria de Gerenciamento de Projetos e para auxiliar nas outras matérias...(EDITÁVEL)', 
    img: require('./assets/pmbok.jpg'), 
    projetosVinculados: ['P4'],
    estado: 'A Fazer',
    progresso: 0,
    isUrgente: false
  },
  { id: 'T5', 
    nome: 'Treinar escalas maiores', 
    desc: 'Conhecer e treinar as escalas maiores da teoria musical, buscar compreender e não apenas decorar...(EDITÁVEL)', 
    img: require('./assets/scales.jpg'), 
    projetosVinculados: ['P5'],
    estado: 'A Fazer',
    progresso: 0,
    isUrgente: false
  },
  { id: 'T6', 
    nome: 'Ler documentação Expo', 
    desc: 'Acessar a documentação do Expo online e ler, com atenção especial aos componentes do trabalho...(EDITÁVEL)', 
    img: require('./assets/reading.jpg'), 
    projetosVinculados: ['P2'],
    estado: 'Feito',
    progresso: 100,
    isUrgente: true
  },
];

const PROJETOS = [
  { id: 'P1', 
    nome: 'Projeto de Pesquisa', 
    desc: 'Proposta de Pesquisa para o Edital de Iniciação Científica no CEUB, a ser enviado até dia 5 de maio pelo professor orientador...(EDITÁVEL)', 
    img: require('./assets/project.jpg'), 
    tarefasVinculadas: ['T1']},
  { id: 'P2', 
    nome: 'Projeto Mobile', 
    desc: 'Projeto da disciplina de Desenvolvimento Mobile utilizando React Native e Expo para o desenvolvimento...(EDITÁVEL)', 
    img: require('./assets/mobile.jpg'), 
    tarefasVinculadas: ['T2', 'T6']},
  { id: 'P3', 
    nome: 'Monitoria TI', desc: 'Monitoria dos Cursos de Tecnologia do CEUB, com o objetivo de apoiar os alunos e professores...(EDITÁVEL)', 
    img: require('./assets/monitoria.png'), 
    tarefasVinculadas: ['T2']},
  { id: 'P4', 
    nome: 'Gerenciamento de Projetos', 
    desc: 'Matéria da faculdade voltada para a gerência de projetos de TI...(EDITÁVEL)', img: require('./assets/management.jpg'), tarefasVinculadas: ['T4']},
  { id: 'P5', 
    nome: 'Aula de baixo', 
    desc: 'Aprendendo técnicas para tocar baixo melhor...(EDITÁVEL)', 
    img: require('./assets/bass.jpg'), 
    tarefasVinculadas: ['T5']},
]


function TelaInicial({ navigation }) {
  useIsFocused();

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
  useIsFocused();

  const { idProjeto } = route.params;
  const projeto = PROJETOS.find(p => p.id === idProjeto);

  // Aqui nós filtramos as tarefas que pertencem a este projeto específico
  const tarefasDesteProjeto = TAREFAS.filter(t => projeto.tarefasVinculadas.includes(t.id));

  // + 2 inputs para completar os 4 exigidos pelo trabalho
  const [nomeProj, setNomeProj] = useState(projeto.nome);
  const [descProj, setDescProj] = useState(projeto.desc);

  const handleSalvarProjeto = () => {
    projeto.nome = nomeProj;
    projeto.desc = descProj;
    alert('Projeto salvo na sessão!');
    navigation.goBack();
  };

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

      {/* Botão Salvar do Projeto */}
      <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvarProjeto}>
        <Text style={styles.btnTexto}>SALVAR PROJETO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function TelaTarefa({ route, navigation }) {
  useIsFocused();

  const { idTarefa } = route.params;
  
  // Encontra a tarefa original no array global
  const tarefa = TAREFAS.find(t => t.id === idTarefa);

  // Estados locais para edição (iniciam com os valores da tarefa)
  const [nomeEditado, setNomeEditado] = useState(tarefa?.nome || '');
  const [descEditada, setDescEditada] = useState(tarefa?.desc || '');
  const [status, setStatus] = useState(tarefa?.status || 'A fazer');
  const [progresso, setProgresso] = useState(tarefa?.progresso || 0);
  const [isUrgente, setUrgente] = useState(tarefa?.isUrgente || false);

  // Trava de segurança
  if (!tarefa) return <Text style={{ marginTop: 50, textAlign: 'center' }}>Tarefa não encontrada</Text>;

  // Lógica para descobrir quais projetos usam essa tarefa
  const projetosDestaTarefa = PROJETOS.filter(p => p.tarefasVinculadas.includes(idTarefa));

  // Função para definir a cor do status
  const getStatusColor = () => {
    if (status === 'A fazer') return '#e74c3c'; // Vermelho
    if (status === 'fazendo') return '#f1c40f'; // Amarelo
    if (status === 'feito') return '#2ecc71';   // Verde
    return '#bdc3c7';
  };

  // --- O NOVO SALVAMENTO EM MEMÓRIA ---
  const handleSalvar = () => {
    // Salvando todos os campos no objeto global
    tarefa.nome = nomeEditado;
    tarefa.desc = descEditada;
    tarefa.status = status;
    tarefa.progresso = progresso;
    tarefa.isUrgente = isUrgente;
    
    alert('Alterações salvas na sessão!');
    navigation.goBack(); 
  };

  return (
    <ScrollView style={styles.containerScroll}>
      
      <View style={styles.headerTarefa}>
        <TextInput 
          style={[styles.titleDetails, { borderBottomWidth: 1, borderColor: '#eee' }]} 
          value={nomeEditado} 
          onChangeText={setNomeEditado} 
          multiline
        />
        <Image source={tarefa.img} style={styles.imagemGrandeTarefa} />
      </View>

      {/* Badge de Status Dinâmico */}
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <Text style={styles.label}>Descrição</Text>
      <TextInput 
        style={styles.inputEditavel} 
        value={descEditada} 
        onChangeText={setDescEditada} 
        multiline 
        numberOfLines={4}
      />

      <Text style={styles.label}>Alterar Status</Text>
      <Picker selectedValue={status} onValueChange={(v) => setStatus(v)}>
        <Picker.Item label="A fazer" value="A fazer" color="#e74c3c"/>
        <Picker.Item label="Fazendo" value="fazendo" color="#f1c40f"/>
        <Picker.Item label="Feito" value="feito" color="#2ecc71"/>
      </Picker>
      
      <View style={styles.row}>
        <Text style={{fontWeight: 'bold'}}>Tarefa Urgente?</Text>
        <Switch value={isUrgente} onValueChange={setUrgente} />
      </View>

      <Text style={styles.label}>Progresso: {Math.round(progresso)}%</Text>
      <Slider
        minimumValue={0} maximumValue={100} value={progresso} onValueChange={setProgresso}
        minimumTrackTintColor={getStatusColor()} maximumTrackTintColor="#d3d3d3"
      />

      {/* SEÇÃO DE PROJETOS VINCULADOS */}
      <Text style={[styles.secaoTitle, { marginTop: 30, fontSize: 18 }]}>Vinculada aos Projetos:</Text>
      {projetosDestaTarefa.map(proj => (
        <TouchableOpacity 
          key={proj.id} 
          style={[styles.card, { backgroundColor: '#f0f0f0', elevation: 0 }]} 
          onPress={() => navigation.navigate('Projeto', { idProjeto: proj.id })}
        >
          <Image source={proj.img} style={[styles.imagem, { width: 40, height: 40 }]} />
          <Text style={styles.nomeTarefa}>{proj.nome}</Text>
        </TouchableOpacity>
      ))}

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
        <Text style={styles.btnTexto}>SALVAR ALTERAÇÕES</Text>
      </TouchableOpacity>

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
    marginRight: 15, 
  },

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
    backgroundColor: '#f9f9f9', // Fundo levemente cinza
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top', // Para o texto começar no topo em multiline
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },btnSalvar: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  btnTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Reutilizando estilos para a lista de projetos dentro da tarefa
  listaHorizontal: {
    marginBottom: 20,
  }
});