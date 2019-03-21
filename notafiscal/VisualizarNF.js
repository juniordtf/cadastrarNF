import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, Alert, AsyncStorage } from "react-native";
import axios from 'axios';
import { Container, Header, Content, Card, CardItem, Item, Body, Icon, Left, Right, Title, Input } from 'native-base';

export default class VisualizarNF extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          notas: []
        }
    }
    
    componentDidMount(){
        this.getNota();
    }

    //importação da API
    getNota(){
        axios.get('http://localhost:4321/notafiscal')
          .then(response => {
            this.setState({notas: response.data});
        })
        .catch(err => console.log(err));
    }  


  render() {

    let trem = this.state.notas

    //construção da renderização através da função map
    let contas = this.state.notas.map((item, index) => {
      return (
        <View>
        <Text> Dados da Nota Fiscal </Text>
        <Text/>
        <View>
        <Text>{JSON.stringify(item.nf)}</Text>
        </View>
        <Text/>
        <Text> Dados do cliente </Text>
        <Text/>
        <Text>{JSON.stringify(item.cliente)}</Text>
        <Text/>
        <Text>Itens da nota fiscal </Text>
        <Text/>
        <Text>{JSON.stringify(item.produtos)}</Text>
        <Text/>
        <Text>* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *</Text>
        <Text/>
      </View>
      )
 
    })

    return (
      <Container>
        <Header>
        <Left>
        <Button 
        iconLeft transparent light onPress={() => this.props.navigation.goBack()}
        title="Voltar"
          />
          </Left>
            <Body>
            <Text style={styles.title}>Visualizar NF</Text>
          </Body>
          <Right />
        </Header> 
        <Content>
            <View>{contas}</View>
        </Content>
      </Container>
    );
  }
}

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