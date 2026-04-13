import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Switch, Button, Flatlist } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Slider } from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function TelaInicial({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        <StatusBar style="auto" />
      </View>
  );
}

function TelaProjeto() {
  return (
    pass
  );
}

function TelaTarefa() {
  return (
    pass
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
  }
});
