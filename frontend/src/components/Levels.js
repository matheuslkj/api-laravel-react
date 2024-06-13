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

  render() {
    return (
      <div>
        <h1>Levels</h1>
      </div>
    );
  }
}

export default Levels;
