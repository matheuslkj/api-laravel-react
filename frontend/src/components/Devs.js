import React from "react";
import { Table, Button, Form } from "react-bootstrap";

class Devs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
            id: 0,
            nome: '',
            id_levels: '',
            sexo: '',
            data_nascimento: '',
            idade: '',
            hobby: '',
            developers: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/developers")
      .then((res) => res.json())
      .then((developers) => {
        this.setState({ developers});
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  buscarLevels = () => {
    fetch("http://127.0.0.1:8000/api/v1/levels")
        .then(response => response.json())
        .then(response => {
            this.setState({ levels: response.data }, () => {
                this.buscarDev();
            });
        })
}


  deletarDev(id) {
    fetch("http://127.0.0.1:8000/api/developers/" + id, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          this.componentDidMount();
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  updateDev(id) {
    fetch("http://127.0.0.1:8000/api/developers/" + id, { method: "GET" })
    .then((res) => res.json())
    .then((developers) => {
      this.setState({ 
        id: developers.data.id,
                    nome: developers.data.nome,
                    id_levels: developers.data.id_levels,
                    sexo: developers.data.sexo,
                    data_nascimento: developers.data.data_nascimento,
                    idade: developers.data.idade,
                    hobby: developers.data.hobby
    });
    })
    .catch((error) => console.error("Error fetching data:", error));
  }
  cadastrarDev = (developers) => {
    fetch("http://127.0.0.1:8000/api/v1/devs",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(developers)
        })
        .then(res => {
            if (res.ok) {
                this.componentDidMount();
            } else {
                alert("Não foi possível adicionar o desenvolvedor!");
            }
        })
}

  renderTabela() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nivel</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.developers.map((developer) => (
            <tr key={developer.id}>
              <td>{developer.nome}</td>
              <td>{developer.nivel.nivel}</td>
              <td>
              <Button
                  variant="secondary"
                  onClick={() => this.updateDev(developer.id)}
                >
                  Excluir
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.deletarDev(developer.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  submit() {
    const dev = {
        nome: this.state.nome,
        id_levels: this.state.id_levels,
        sexo: this.state.sexo,
        data_nascimento: this.state.data_nascimento,
        idade: this.state.idade,
        hobby: this.state.hobby
    }

    this.cadastrarDev(dev);
}

  render() {
    return (
      <div>
         <Form> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID:</Form.Label>
                        <Form.Control type="text" value={this.state.id} readOnly={true} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" required placeholder="Digite o nome: " value={this.state.nome}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nível</Form.Label>
                        <Form.Select aria-label="Default select example" value={this.state.id_level}>
                            <option>Selecione o nível</option>
                            {this.state.developers.map(developer => (
                                <option key={developer.id_levels} value={developer.id_levels}>{developer.nivel.nivel}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Sexo</Form.Label>
                        <Form.Select aria-label="Default select example" value={this.state.sexo}  required>
                            <option>Selecione o sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nascimento</Form.Label>
                        <Form.Control type="date" value={this.state.data_nascimento}  required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control type="number" required placeholder="Digite sua idade: " value={this.state.idade}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Hobby</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nos conte seu hobby:" value={this.state.hobby}  />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={() => { this.submit() }}>
                        Cadastrar
                    </Button>
                </Form>
        {this.renderTabela()}
      </div>
    );
  }
}

export default Devs;
