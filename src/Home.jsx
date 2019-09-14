import React, { Component } from "react";
import Performance from "./Performance";
import Portifolio from "./Portfolio";
import Button from "react-bootstrap/Button";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { user: 1 };
  }

  alterUser() {
    const user = this.state.user === 1 ? 2 : 1;
    console.log(user, "Alterar Usuário Home");
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <div className="container-fluid bg-1 text-center p-5 " id="secao1">
          <h4>"</h4>

          <h3>
            <strong> Teste para Estágio Cryptonita</strong>
          </h3>

          <p>
            "Você quer ser reconhecido? Seja diferença na vida de outra pessoa,
            e o reconhecimento aparecerá!" ~ The JavaMan.
          </p>

          <p>
            Essa frase foi dita durante a palestra do evento Cresça com o
            Google, e marcou minha vida por completo. Não quero ser apenas um no
            meio da multidão, quero poder fazer parte de algo maior.
          </p>
          <p>
            E vejo na CRYPTONITA uma oportunidade incrível para alcançar meu
            sonho.
          </p>

          <h4>"</h4>

          <h3>Clique e altere de usuário</h3>
          <h3>&#8609;</h3>
          <div className="mt-4">
            <Button size="lg" variant="danger" onClick={() => this.alterUser()}>
              Alterar usuário
            </Button>
          </div>
        </div>

        <Performance user={user} />

        <Portifolio user={user} />
      </div>
    );
  }
}
