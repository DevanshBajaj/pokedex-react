import React, { Component } from 'react';


class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: ''
    };
    render() {
    const {name, url} = this.props;
        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <div className="card"></div>
                <div className="card-header">
                    <h1>{name}</h1>
                </div>
            </div>
        )
    }
}

export default PokemonCard
