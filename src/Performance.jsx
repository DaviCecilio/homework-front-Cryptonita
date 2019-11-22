import React, { Component } from "react";
//importando biblioteca que faz requisições para a API
import axios from "axios";
//importando biblioteca de grafico
// http://recharts.org/en-US/
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import Table from "react-bootstrap/Table";

export default class Performance extends Component {
  constructor(props) {
    super(props);

    //definindo estagio inicial do objeto como um array vazio
    this.state = { performanceData: [] };
  }
  //Essa função é chamada assim que o componente tiver sido carregado
  componentDidMount() {
    const { user } = this.props;
    this.getUserPerformance(user);
  }
  //Essa função é chamada para atualizar o componente
  componentDidUpdate(prevProps) {
    //Declarar constante / Verifica a atualização passada com Prev's
    const { user } = this.props;
    if (prevProps.user !== user) this.getUserPerformance(user);
  }

  //Função que faz requisição na API e retorna a performance do usuário
  //Declarando o User
  async getUserPerformance(user: Number) {
    try {
      //Requisição na API
      //Essa alteração permite fazer alteração pelo Button ()
      axios.get(`http://localhost:8080/performance/${user}`).then(user => {
        this.setState({ performanceData: user.data });
      });
      //populando o objeto com a resposta da API
    } catch (e) {
      console.log(e);
    }
  }

  //Função que renderiza componentes na tela
  render() {
    //referenciando o objeto que irá preencher o gráfico
    let { performanceData } = this.state;

    //Condicionamento por ternário (Forma mais limpa e melhor executavel de um IF)
    let maiorperformance =
      performanceData.length >= 1 ? performanceData[0].performance : 0; //Setei a variavel com o Array
    let menorperformance =
      performanceData.length >= 1 ? performanceData[0].performance : 0;

    //Defini o Maior e o Menor
    //.map - Ferramenta que pecorre a Array
    performanceData.map(user => {
      if (user.performance >= maiorperformance) {
        maiorperformance = user.performance;
      } else if (user.performance <= menorperformance)
        menorperformance = user.performance;
    }
    );



    return (
      <div
        className="container-fluid text-center bg-2 p-4 borderbottom"
        id="secao2"
      >
        <h1>Performance</h1>
        <hr className="divider my-3" />

        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-lg-8">
              <LineChart width={600} height={300} data={performanceData}>
                <Line type="monotone" dataKey="performance" stroke="#6be912" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
              </LineChart>
            </div>

            <div className="col-12 col-lg-4 mt-5">
              <Table bordered hover variant="dark">
                <thead>
                  <tr>
                    <th colSpan="2">#</th>
                    <th>Dados</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan="2">Maior Performance</td>
                    <td>{maiorperformance}</td>
                  </tr>

                  <tr>
                    <td colSpan="2">Menor Performance</td>
                    <td>{menorperformance}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
