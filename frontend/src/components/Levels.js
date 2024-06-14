// src/components/Levels.js
import React from "react";
import { Table, Pagination } from "react-bootstrap";

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
          this.setState({ levels: res.data });
        } else if (Array.isArray(res)) {
          this.setState({ levels: res });
        } else {
          console.error("Unexpected response structure for levels:", res);
        }
      })
      .catch((error) => console.error("Error fetching levels:", error));
  };

  getDevelopers = () => {
    fetch("http://127.0.0.1:8000/api/developers")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          this.setState({ developers: res.data });
        } else if (Array.isArray(res)) {
          this.setState({ developers: res });
        } else {
          console.error("Unexpected response structure for developers:", res);
        }
      })
      .catch((error) => console.error("Error fetching developers:", error));
  };

  countDevelopersByLevel = (levelId) => {
    return this.state.developers.filter((developer) => developer.levels_id === levelId).length;
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nível</th>
              <th>Quantidade de Desenvolvedores</th>
            </tr>
          </thead>
          <tbody>
            {currentLevels.map((level) => (
              <tr key={level.id}>
                <td>{level.id}</td>
                <td>{level.nivel}</td>
                <td>{this.countDevelopersByLevel(level.id)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => this.handleClick(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>Levels Component</h1>
        {this.renderTabela()}
      </div>
    );
  }
}

export default Levels;
