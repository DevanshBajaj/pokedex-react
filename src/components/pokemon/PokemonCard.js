import React, { Component } from "react";
import {Link} from "react-router-dom";

import styles from "./PokemonCard.module.css";
import styled from "styled-components";
import LottieAnimation from "../../Lottie";
import spinner from "../../lotties/spinner.json";

const Sprite = styled.img`
	width: 5em;
	height: 5em;
	display: none;
	margin: 0 auto;
`;

class PokemonCard extends Component {
	state = {
		name: "",
		imageUrl: "",
		pokemonIndex: "",
	};

	componentDidMount() {
		const { name, url } = this.props;
		const pokemonIndex = url.split("/")[url.split("/").length - 2];
		const imageUrl =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
		this.setState({
			name,
			imageUrl,
			pokemonIndex,
			imageLoading: true,
			tooManyRequests: false,
		});
	}

	render() {
		return (
			<div className="col-md-3 col-sm-6 mb-5">
        <Link style={{textDecoration: 'none'}} to={`pokemon/${this.state.pokemonIndex}` }>
          <div className={styles.card}>
            <h5 className={styles.card_header}>{this.state.pokemonIndex}</h5>
            <div className={styles.card_body}>
              {this.state.imageLoading ? (
                <LottieAnimation
                  lotti={spinner}
                  alt="spinner"
                  height={"50%"}
                  width={"50%"}
                  className="card-img-top rounded mx-auto d-block mt-2"
                ></LottieAnimation>
              ) : null}
              <Sprite
                className="card-img-top rounded mx-auto mt-2"
                src={this.state.imageUrl}
                alt="pokemon image"
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ tooManyRequests: true })}
                style={
                  this.state.tooManyRequests
                    ? { display: "none" }
                    : this.state.imageLoading
                    ? null
                    : { display: "block" }
                }
              ></Sprite>
              {this.state.tooManyRequests ? (
                <h6 className="mx-auto">
                  <span className='badge bg-danger rounded-pill mt-2'>Too Many Requests</span>
                </h6>
              ) : null}
              <h6 className={styles.card_title}>
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </h6>
            </div>
          </div>
        </Link>
			</div>
		);
	}
}

export default PokemonCard;
