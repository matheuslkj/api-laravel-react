// src/components/Levels.js
import React from "react";

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

  // Métodos para buscar dados dos níveis e desenvolvedores
  getLevels = () => {
    // Implementação futura
  };

  getDevelopers = () => {
    // Implementação futura
  };

  render() {
    return (
      <div>
        <h1>Levels Component</h1>
      </div>
    );
  }
}

export default Levels;
