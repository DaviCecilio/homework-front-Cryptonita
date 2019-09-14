import React, { Component } from "react";
//importando biblioteca que faz requisições para a API
import axios from "axios";
//importando biblioteca de grafico
// http://recharts.org/en-US/

import {
  PieChart, // Grafico de Pizza - Pai
  Pie, // Filho
  Tooltip
} from "recharts";
import Table from "react-bootstrap/Table";

//FIZ A UTILIZAÇÃO DE UMA API PARA RETORNAR OS VALORES EM USD DAS CRYPTOS!

export default class Portifolio extends Component {
  constructor(props) {
    super(props);

    //definindo estagio inicial do objeto como um array vazio
    //
    this.state = { portfolioData: [], cryptos: [] }; //Todas Array
  }

  //Essa função é chamada assim que o componente tiver sido carregado
  componentDidMount() {
    const { user } = this.props;
    this.getUserPortfolio(user);
  }
  //Essa função irá atualizar o componente
  //Prevs retorna a utilização passada
  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user !== user) this.getUserPortfolio(user); //Se não tiver nada, já irá setar como o primeira Usuário
  }

  //Função que faz requisição na API e retorna portfolio do usuário
  getUserPortfolio(user: Number) {
    try {
      //Requisição na API Axios - DataBase Interno
      axios.get(`http://localhost:8080/portfolio/${user}`).then(user => {
        this.setState({ portfolioData: user.data });
      });

      //Requisição na API de Criptos
      axios.get("https://api.coinlore.com/api/tickers/").then(values => {
        //Values se encontra na API
        this.setState({ cryptos: values.data });
      });
    } catch (e) {
      console.log(e);
    }
  }

  //Função que renderiza componentes na tela

  render() {
    //referenciando todos os objetos criados
    let { portfolioData, cryptos } = this.state;

    //
    cryptos = cryptos.data ? cryptos.data : [];

    //Ternario para setar o Maior e Menor como o array Primeiro
    let maiormoeda = portfolioData.length >= 1 ? portfolioData[0].amount : 0;
    let menormoeda = portfolioData.length >= 1 ? portfolioData[0].amount : 0;

    //Definindo o Maior e o Menor Realmente
    portfolioData.map(user => {
      if (user.amount > maiormoeda) maiormoeda = user.amount;
      if (user.amount < menormoeda) menormoeda = user.amount;
    });

    //Renderizando a Aplicação

    //

    return (
      <div className="container-fluid text-center bg-3 p-4" id="secao3">
        <h1>Portfólio</h1>
        <hr className="divider my-3" />

        <div className="container">
          <div className="row">
            <div className="col" />
            <div className="col-lg-8 col-12">
              <PieChart width={830} height={350}>
                <Pie
                  data={portfolioData}
                  dataKey="amount"
                  nameKey="coin"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#00FF00"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
            <div className="col" />
          </div>

          <div className="row">
            <div className="col-12 col-lg-6 mt-3">
              <div className="mt-1 mb-3">
                <Table bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th colSpan="2">#</th>
                      <th>Dados</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td colSpan="2">Maior Moeda</td>
                      <td>{maiormoeda}</td>
                    </tr>

                    <tr>
                      <td colSpan="2">Menor Moeda</td>
                      <td>{menormoeda}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>

            <div className="col-12 col-lg-6 mt-3">
              <div className="mt-1 mb-3">
                <Table bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th colSpan="2">#</th>
                      <th>Valor USD</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cryptos &&
                      cryptos.map(value => {
                        return portfolioData.map(valuser => {
                          if (value.name === valuser.coin) {
                            return (
                              <tr key={value.name}>
                                <td colSpan="2">{valuser.coin}</td>
                                <td>{value.price_usd * valuser.amount}</td>
                              </tr>
                            );
                          }
                        });
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
