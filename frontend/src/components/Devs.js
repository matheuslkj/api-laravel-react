import React from "react";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class Devs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nome: "",
      sexo: "",
      data_nascimento: "",
      idade: "",
      hobby: "",
      levels_id: "",
      developers: [],
      levels: [],
      isEditing: false,
      modalOpened: false,
      currentPage: 1,
      developersPerPage: 10,
      searchQuery: "",
      sortField: "nome",
      sortDirection: "asc",
    };
  }

  componentDidMount() {
    this.getLevels();
  }

  getLevels = () => {
    fetch("http://127.0.0.1:8000/api/levels")
      .then((res) => res.json())
      .then((res) => {
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
      .catch((error) => console.error("Error fetching levels:", error));
  };

  getDev = () => {
    fetch("http://127.0.0.1:8000/api/developers")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          const developers = res.data.map((developer) => ({
            ...developer,
            level_nivel: this.findLevelName(developer.levels_id),
          }));
          this.setState({ developers });
        } else if (Array.isArray(res)) {
          const developers = res.map((developer) => ({
            ...developer,
            level_nivel: this.findLevelName(developer.levels_id),
          }));
          this.setState({ developers });
        } else {
          console.error("Unexpected response structure for developers:", res);
        }
      })
      .catch((error) => console.error("Error fetching developers:", error));
  };

  editDeveloper = (id, developer) => {
    fetch(`http://127.0.0.1:8000/api/developers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(developer),
    })
      .then((res) => {
        if (res.ok) {
          this.clearForm();
          this.getDev();
          toast.success("Desenvolvedor atualizado com sucesso!");
        }
      })
      .catch((error) => console.error("Error updating developer:", error));
  };

  fillForm = (developer) => {
    const formattedDate = developer.data_nascimento.split(" ")[0];
    this.setState({
      id: developer.id,
      nome: developer.nome,
      sexo: developer.sexo,
      data_nascimento: formattedDate,
      idade: developer.idade,
      hobby: developer.hobby,
      levels_id: developer.levels_id,
      isEditing: true,
    });
    this.openModal();
  };

  clearForm = () => {
    this.setState({
      id: 0,
      nome: "",
      sexo: "",
      data_nascimento: "",
      idade: "",
      hobby: "",
      levels_id: "",
      isEditing: false,
    });
  };

  findLevelName = (id) => {
    const level = this.state.levels.find((level) => level.id === id);
    return level ? level.nivel : "";
  };

  cadDeveloper = (developer) => {
    fetch("http://127.0.0.1:8000/api/developers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(developer),
    })
      .then((res) => {
        if (res.ok) {
          this.getDev();
          toast.success("Desenvolvedor cadastrado com sucesso!");
        }
      })
      .catch((error) => console.error("Error posting developer:", error));
  };

  putDev = (developer) => {
    fetch("http://127.0.0.1:8000/api/developers/" + developer.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(developer),
    }).then((res) => {
      if (res.ok) {
        this.getDev();
      } else {
        alert("ERROR");
      }
    });
  };

  deletarDev = (id) => {
    fetch("http://127.0.0.1:8000/api/developers/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        this.getDev();
        toast.success("Desenvolvedor deletado com sucesso!");
      }
    });
  };

  componentWillUnmount() {
    // Cleanup if necessary
  }

  handleClick = (number) => {
    this.setState({ currentPage: number });
  };

  updateSearchQuery = (e) => {
    this.setState({ searchQuery: e.target.value, currentPage: 1 });
  };

  handleSort = (field) => {
    const { sortField, sortDirection } = this.state;
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    this.setState({ sortField: field, sortDirection: newDirection });
  };

  sortDevelopers = (developers) => {
    const { sortField, sortDirection } = this.state;
    return developers.sort((a, b) => {
      const aField = a[sortField];
      const bField = b[sortField];

      if (aField < bField) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aField > bField) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  renderTabela() {
    const { developers, currentPage, developersPerPage, searchQuery } = this.state;
    const filteredDevelopers = developers.filter((developer) =>
      developer.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sortedDevelopers = this.sortDevelopers(filteredDevelopers);
    const indexOfLastDev = currentPage * developersPerPage;
    const indexOfFirstDev = indexOfLastDev - developersPerPage;
    const currentDevelopers = sortedDevelopers.slice(indexOfFirstDev, indexOfLastDev);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredDevelopers.length / developersPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <Form.Control
          type="text"
          placeholder="Buscar por nome"
          value={searchQuery}
          onChange={this.updateSearchQuery}
          className="mb-3"
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th onClick={() => this.handleSort('nome')} style={{ cursor: 'pointer' }}>
                Nome {this.state.sortField === 'nome' ? (this.state.sortDirection === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Nível</th>
              <th className="text-end">Opções</th>
            </tr>
          </thead>
          <tbody>
            {currentDevelopers.map((developer) => (
              <tr key={developer.id}>
                <td>{developer.id}</td>
                <td>{developer.nome}</td>
                <td>{developer.nivel.nivel}</td>
                <td className="text-end">
                  <Button variant="warning" className="m-1" onClick={() => this.fillForm(developer)}>Editar</Button>
                  <Button
                    variant="danger"
                    onClick={() => this.deleteUserConfirm(developer.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
            <ConfirmDialog />
          </tbody>
        </Table>
        <Pagination>
          {pageNumbers.map(number => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => this.handleClick(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </>
    );
  }

  updateField = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  submit = () => {
    const developer = {
      nome: this.state.nome,
      sexo: this.state.sexo,
      data_nascimento: this.state.data_nascimento,
      idade: this.state.idade,
      hobby: this.state.hobby,
      levels_id: this.state.levels_id,
    };

    if (this.state.isEditing) {
      this.editDeveloper(this.state.id, developer);
    } else {
      this.cadDeveloper(developer);
    }

    this.handleClose();
  };

  deleteUserConfirm = (id) => {
    confirmDialog({
      message: 'Você tem certeza que deseja excluir esse Dev?',
      header: 'Atenção',
      icon: 'pi pi-trash',
      accept: () => this.deletarDev(id),
    });
  };

  handleClose = () => {
    this.setState({
      modalOpened: false
    });
    this.clearForm();
  }

  openModal = () => {
    this.setState({
      modalOpened: true
    });
  }

  render() {
    return (
      <div className="container">
        <Modal show={this.state.modalOpened} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={this.state.id} readOnly={true} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu nome."
                  required
                  value={this.state.nome}
                  onChange={this.updateField("nome")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Sexo:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  required
                  value={this.state.sexo}
                  onChange={this.updateField("sexo")}
                >
                  <option>Selecione o sexo</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={this.state.data_nascimento}
                  onChange={this.updateField("data_nascimento")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Idade:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite sua Idade."
                  required
                  value={this.state.idade}
                  onChange={this.updateField("idade")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nível</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  required
                  value={this.state.levels_id}
                  onChange={this.updateField("levels_id")}
                >
                  <option value="">Selecione o nível</option>
                  {this.state.levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.nivel}
                    </option>
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
                  onChange={this.updateField("hobby")}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={this.submit}>
              Salvar mudanças
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="primary" type="submit" onClick={this.openModal} className="mb-3">
          Cadastrar
        </Button>
        {this.renderTabela()}
      </div>
    );
  }
}

export default Devs;
