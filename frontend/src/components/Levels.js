import React from "react";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import "react-toastify/dist/ReactToastify.css";
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // CSS principal
import 'primeicons/primeicons.css'; // Ícones

class Levels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nivel: "",
      levels: [],
      developers: [],
      isEditing: false,
      modalOpened: false,
      currentPage: 1,
      levelsPerPage: 10,
      searchQuery: "",
      sortField: "nivel",
      sortDirection: "asc",
    };
  }

  componentDidMount() {
    this.getLevels();
    this.getDevelopers();
  }

  getLevels = () => {
    fetch("http://127.0.0.1:8000/api/levels")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log("Níveis recebidos da API:", res.data);
          this.setState({ levels: res.data });
        } else if (Array.isArray(res)) {
          console.log("Níveis recebidos da API:", res);
          this.setState({ levels: res });
        } else {
          console.error("Estrutura de resposta inesperada para níveis:", res);
        }
      })
      .catch((error) => console.error("Erro ao buscar níveis:", error));
  };

  getDevelopers = () => {
    fetch("http://127.0.0.1:8000/api/developers")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log("Desenvolvedores recebidos da API:", res.data);
          this.setState({ developers: res.data });
        } else if (Array.isArray(res)) {
          console.log("Desenvolvedores recebidos da API:", res);
          this.setState({ developers: res });
        } else {
          console.error("Estrutura de resposta inesperada para desenvolvedores:", res);
        }
      })
      .catch((error) => console.error("Erro ao buscar desenvolvedores:", error));
  };

  countDevelopersByLevel = (levelId) => {
    const count = this.state.developers.filter((developer) => developer.levels_id === levelId).length;
    console.log(`Nível com ID: ${levelId} tem ${count} desenvolvedor(es)`);
    return count;
  };

  handleSort = (field) => {
    const { sortField, sortDirection } = this.state;
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    this.setState({ sortField: field, sortDirection: newDirection });
  };

  handleClick = (number) => {
    this.setState({ currentPage: number });
  };

  updateSearchQuery = (e) => {
    this.setState({ searchQuery: e.target.value, currentPage: 1 });
  };

  renderTabela = () => {
    const { levels, currentPage, levelsPerPage, searchQuery, sortField, sortDirection } = this.state;
    const filteredLevels = levels.filter((level) =>
      level.nivel.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sortedLevels = filteredLevels.sort((a, b) => {
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

    const indexOfLastLevel = currentPage * levelsPerPage;
    const indexOfFirstLevel = indexOfLastLevel - levelsPerPage;
    const currentLevels = sortedLevels.slice(indexOfFirstLevel, indexOfLastLevel);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredLevels.length / levelsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <Form.Control
          type="text"
          placeholder="Buscar por nível"
          value={searchQuery}
          onChange={this.updateSearchQuery}
          className="mb-3"
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th onClick={() => this.handleSort('nivel')} style={{ cursor: 'pointer' }}>
                Nível {this.state.sortField === 'nivel' ? (this.state.sortDirection === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Quantidade de Desenvolvedores</th>
              <th className="text-end">Opções</th>
            </tr>
          </thead>
          <tbody>
            {currentLevels.map((level) => (
              <tr key={level.id}>
                <td>{level.id}</td>
                <td>{level.nivel}</td>
                <td>{this.countDevelopersByLevel(level.id)}</td>
                <td className="text-end">
                  <Button
                    variant="warning"
                    onClick={() => this.editLevel(level)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => this.deleteLevelConfirm(level.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => this.handleClick(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    );
  };

  updateField = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  editLevel = (level) => {
    this.setState({
      id: level.id,
      nivel: level.nivel,
      isEditing: true,
      modalOpened: true,
    });
  };

  clearForm = () => {
    this.setState({
      id: 0,
      nivel: "",
      isEditing: false,
    });
  };

  submit = () => {
    const { id, nivel, isEditing } = this.state;
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `http://127.0.0.1:8000/api/levels/${id}` : "http://127.0.0.1:8000/api/levels";
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nivel }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.handleClose();
          this.getLevels();
          toast.success("Nível atualizado com sucesso!");
        } else {
          console.error("Erro ao atualizar nível:", res);
          toast.error("Erro ao atualizar nível.");
        }
      })
      .catch((error) => console.error("Erro ao atualizar nível:", error));
  };

  deleteLevelConfirm = (id) => {
    console.log(`Solicitação para deletar nível com ID: ${id}`);
    confirmDialog({
      message: 'Você tem certeza que deseja excluir este nível?',
      header: 'Atenção',
      icon: 'pi pi-trash',
      accept: () => this.deleteLevel(id),
    });
  };

  deleteLevel = (id) => {
    console.log(`Tentando deletar o nível com ID: ${id}`);
    fetch(`http://127.0.0.1:8000/api/levels/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Nível com ID: ${id} deletado com sucesso`);
          this.getLevels();
          toast.success("Nível deletado com sucesso!");
        } else {
          console.error(`Erro ao deletar nível com ID: ${id}. Status: ${res.status}`);
          toast.error("Erro ao deletar nível.");
        }
      })
      .catch((error) => {
        console.error(`Erro ao deletar nível com ID: ${id}`, error);
        toast.error("Erro ao deletar nível.");
      });
  };

  handleClose = () => {
    this.setState({
      modalOpened: false,
    });
    this.clearForm();
  };

  openModal = () => {
    this.setState({
      modalOpened: true,
    });
  };

  render() {
    return (
      <div className="container">
        <ConfirmDialog />
        <Modal show={this.state.modalOpened} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Gerenciar Nível</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={this.state.id} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nível</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nível"
                  value={this.state.nivel}
                  onChange={this.updateField("nivel")}
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
        <Button variant="primary" onClick={this.openModal}>
          Adicionar nível
        </Button>
        {this.renderTabela()}
      </div>
    );
  }
}

export default Levels;
