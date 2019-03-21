import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, Alert, AsyncStorage } from "react-native";
import { Container, Header, Content, Card, CardItem, Item, Body, Icon, Left, Right, Title, Input, Form } from 'native-base';
import axios from 'axios';


class CadastrarNF extends React.Component {
  constructor(){
    super();
    this.state = {
      cliente: [],
      nome: "",
      cpf: "",
      nf: [],
      ns: "",
      data: "",
      valorNF: "",
      produtos: [],
      nomeProduto: "",
      valorUnit: "",
      valorTotal: "",
      pedido: []
    }
  }

  //função para adicionar produtos
  adicionarItem() {
    if(this.state.nomeProduto.length > 0 && this.state.valorUnit.length > 0 && this.state.valorTotal.length > 0){
      let produtos = this.state.produtos;

      produtos.push({
        nomeP: this.state.nomeProduto,
        valorU: this.state.valorUnit,
        valorT: this.state.valorTotal
      });

      this.setState({
        nomeProduto:"",
        valorUnit:"",
        valorTotal:"",
      });
    }
  }

  //comunicação com a API através do método POST
  salvarNF = () => {
    
    let produtos = this.state.produtos;

    const cliente = {
        nome: this.state.nome,
        cpf: this.state.cpf
    }

    const nf = {
        ns: this.state.ns,
        data: this.state.data,
        valorNF: this.state.valorNF
    }


    let pedido = { cliente, nf, produtos }

    axios.request({
      method:'post',
      url:'http://localhost:4321/notafiscal',
      data: pedido
    }).then(response => {
      console.log(response.body);      
    }).catch(err =>console.log(err));

    Alert.alert("Nota fiscal cadastrada com sucesso!");
    this.props.navigation.navigate("Home")

  }
  
  render() {
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
            <Text style={styles.title}>Cadastrar NF</Text>
          </Body>
          <Right />
        </Header>
        <Content>
        <Card>
            <Form>
                <Text>Dados do cliente</Text>
                <Item>
                  <Input placeholder="Nome do cliente..." 
                  value={this.state.nome}
                  onChangeText={nome => this.setState({ nome })}
                  maxLength={70}
                  />
                </Item>
                <Item>
                  <Input placeholder="CPF do cliente..." 
                  value={this.state.cpf}
                  onChangeText={cpf => this.setState({ cpf })}
                  maxLength={14}
                  />
                </Item>
                <Text>Dados da Nota Fiscal</Text>
                <Item>
                  <Input placeholder="Número de série..." 
                  value={this.state.ns}
                  onChangeText={ns => this.setState({ ns })}
                  maxLength={10}
                  />
                </Item>
                <Item>
                  <Input placeholder="Data de lançamento..." 
                  value={this.state.data}
                  onChangeText={data => this.setState({ data })}
                  maxLength={8}
                  />
                </Item>
                <Item>
                  <Input placeholder="Valor total..." 
                  value={this.state.valorNF}
                  onChangeText={valorNF => this.setState({ valorNF })}
                  maxLength={10}
                  />
                </Item>
                <Text> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                <Text />
                <Text>Itens da Nota Fiscal</Text>
                <Item>
                  <Input placeholder="Nome do produto..." 
                  value={this.state.nomeProduto}
                  onChangeText={nomeProduto => this.setState({ nomeProduto })}
                  maxLength={30}
                  />
                </Item>
                <Item>
                  <Input placeholder="Valor do produto..." 
                  value={this.state.valorUnit}
                  onChangeText={valorUnit => this.setState({ valorUnit })}
                  maxLength={30}
                  />
                </Item>
                <Item>
                  <Input placeholder="Valor total do produto..." 
                  value={this.state.valorTotal}
                  onChangeText={valorTotal => this.setState({ valorTotal })}
                  maxLength={8}
                  />
                </Item>
                <Button
                     onPress={() => this.adicionarItem()}
                    title="Adicionar item"
                 />
        <Text/>
        </Form>
        </Card>
        <Card>
                <Button
                     onPress={() => this.salvarNF()}
                    title="Cadastrar Nota Fiscal"
                 />
        </Card>    
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

export default CadastrarNF;