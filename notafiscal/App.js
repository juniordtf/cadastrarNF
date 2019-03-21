import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, Alert, AsyncStorage } from "react-native";
import { Container, Header, Content, Card, CardItem, Item, Body, Icon, Left, Right, Title, Input, Form } from 'native-base';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import CadastrarNF from './CadastrarNF';
import VisualizarNF from './VisualizarNF';

//Tela inicial do aplicativo que apresenta as seções de navegação para cadastrar ou visualizar uma NF

class Home extends React.Component {
  
  render() {
    return (
      <Container>
        <Header>
          <Text style={styles.title}>Cadastro de NF</Text>
        </Header>
        <Content>
        <Card>
        <CardItem>
        <Button
              onPress={() => this.props.navigation.navigate("CadastrarNF")}
              title="Cadastrar NF"
          />
        </CardItem>
        <CardItem>
        <Button
              onPress={() => this.props.navigation.navigate("VisualizarNF")}
              title="Visualizar NF"
          />
        </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  CadastrarNF: {
    screen: CadastrarNF,
    navigationOptions: {
      header: null
    }
  },
  VisualizarNF: {
    screen: VisualizarNF,
    navigationOptions: {
      header: null,
    },
  }
});

const App = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25,
    height: 80,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  title: {
    fontSize: 22,
    color: "black",
    textAlign: "center"
  },
});

export default App;