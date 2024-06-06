import React from "react";
import { Table, Form, Button } from "react-bootstrap";

class Devs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nome: '',
      sexo: '',
      data_nascimento: '',
      idade: '',
      hobby: '',
      levels_id: '',
      developers: [],
      levels:[]
    };
  }

  componentDidMount() {
      this.getLevels();
  }

  getLevels = () => {
    fetch("http://127.0.0.1:8000/api/levels")
      .then(res => res.json())
      .then(res => {
        console.log("Levels response:", res);
        if (res.data) {
          this.setState({ levels: res.data }, () => {
            this.getDev();
          });
        } else if (Array.isArray(res)) {
          this.setState({ levels: res }, () => {
            this.getDev();
          });
        } else {
          console.error("Unexpected response structure for levels:", res);
        }
      })
      .catch(error => console.error("Error fetching levels:", error));
  }

  getDev = () => {
    fetch("http://127.0.0.1:8000/api/developers")
      .then(res => res.json())
      .then(res => {
        console.log("Developers response:", res);
        if (res.data) {
          const developers = res.data.map(developer => ({
            ...developer,
            level_nivel: this.findLevelName(developer.levels_id)
          }));
          this.setState({ developers });
        } else if (Array.isArray(res)) {
          const developers = res.map(developer => ({
            ...developer,
            level_nivel: this.findLevelName(developer.levels_id)
          }));
          this.setState({ developers });
        } else {
          console.error("Unexpected response structure for developers:", res);
        }
      })
      .catch(error => console.error("Error fetching developers:", error));
  }

  findLevelName = (id) => {
    const level = this.state.levels.find(level => level.id === id);
    return level ? level.nivel : '';
  }

  cadDeveloper = (developer) => {
    fetch("http://127.0.0.1:8000/api/developers", {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(developer) 
    })
    .then(res => {
      if (res.ok) {
        this.getDev();
      }
    })
    .catch((error) => console.error("Error posting developer:", error));
  }

  deletarDev = (id) => {
    fetch("http://127.0.0.1:8000/api/developers/" +id, { method:'DELETE'})
    .then(res => { 
      if(res.ok){
        this.getDev();
      }
    })
  }

  componentWillUnmount() {
    // Cleanup if necessary
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
                <Button variant="danger" onClick={() => this.deletarDev(developer.id)}>
                    Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  updateField = (field) => (e) => {
    this.setState({
        [field]: e.target.value
    });
  }

  submit = (e) => {
    e.preventDefault();
    const developer = {
      nome: this.state.nome,
      sexo: this.state.sexo,
      data_nascimento: this.state.data_nascimento,
      idade: this.state.idade,
      hobby: this.state.hobby,
      levels_id: this.state.levels_id
    }

    this.cadDeveloper(developer);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.submit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome:</Form.Label>
            <Form.Control type="text" placeholder="Digite seu nome." required value={this.state.nome} onChange={this.updateField('nome')}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Sexo:</Form.Label>
            <Form.Select aria-label="Default select example" required value={this.state.sexo} onChange={this.updateField('sexo')}>
              <option>Selecione o sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Data de Nascimento:</Form.Label>
            <Form.Control type="date" required value={this.state.data_nascimento} onChange={this.updateField('data_nascimento')}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Idade:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite sua Idade."
              required
              value={this.state.idade}
              onChange={this.updateField('idade')}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nível</Form.Label>
            <Form.Select
              aria-label="Default select example"
              required
              value={this.state.levels_id}
              onChange={this.updateField('levels_id')}
            >
              <option value="">Selecione o nível</option>
              {this.state.levels.map((level) => (
                <option key={level.id} value={level.id}>{level.nivel}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Hobby:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Conte seus Hobbys."
              required
              value={this.state.hobby}
              onChange={this.updateField('hobby')}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {this.renderTabela()}
      </div>
    );
  }
}

export default Devs;
