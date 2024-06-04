import React from "react";
import { Table } from "react-bootstrap";

class Devs extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            developers: [],
            isLoading: true
        }
    }

    componentDidMount(){
        fetch("http://127.0.0.1:8000/api/developers")
            .then(res => res.json())
            .then(developers => {
                this.setState({ developers, isLoading: false });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    componentWillUnmount(){
        // Cleanup if necessary
    }

    render (){
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nivel</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.developers.map((developer) =>
                            <tr key={developer.id}>
                                <td>{developer.nome}</td>
                                <td>{developer.nivel.nivel}</td>
                                <td>{/* Aqui você pode adicionar opções como editar ou deletar */}</td>
                            </tr>
                        ) 
                    }
                </tbody>
            </Table>
        )
    }
}

export default Devs;