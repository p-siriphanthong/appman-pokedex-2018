import React, { Component } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Card from "./Card";

// const COLORS = {
//   Psychic: "#f8a5c2",
//   Fighting: "#f0932b",
//   Fairy: "#c44569",
//   Normal: "#f6e58d",
//   Grass: "#badc58",
//   Metal: "#95afc0",
//   Water: "#3dc1d3",
//   Lightning: "#f9ca24",
//   Darkness: "#574b90",
//   Colorless: "#FFF",
//   Fire: "#eb4d4b"
// };

const Wrapper = styled.div`
  position: relative;
  height: 768px;
  width: 1024px;
`;

const Header = styled.div`
  font-size: 2.5em;
  text-align: center;
  padding: 15px 0;
  background-color: white;
`;

const Content = styled.div`
  height: calc(768px - 95px - 100px);
  background-color: white;
  overflow-y: scroll;
`;

const Footer = styled.div`
  background-color: #ec5656;
  height: 100px;
  position: relative;
  box-shadow: 0 -5px 5px -5px #d9333387;
`;

const Button = styled.div`
  background-color: #ec5656;
  box-shadow: 0 -5px 5px -5px #d9333387;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  left: calc(50% - 75px);
  top: -50px;
  text-align: center;
  font-size: 100px;
  color: white;
  cursor: pointer;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [], modal: false };
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  addCard = newCard => {
    this.setState({ cards: [...this.state.cards, newCard] });
  };

  removeCard = removeCard => {
    this.setState({
      cards: this.state.cards.filter(card => card !== removeCard)
    });
  };

  render() {
    return (
      <Wrapper>
        {this.state.modal ? (
          <Modal
            onClick={this.toggleModal}
            addCard={this.addCard}
            currentCards={this.state.cards}
          />
        ) : (
          ""
        )}
        <Header>My Pokedex</Header>
        <Content>
          {this.state.cards.map((card, index) => (
            <Card
              key={index}
              width={"50%"}
              card={card}
              button={"X"}
              event={e => this.removeCard(card)}
            />
          ))}
        </Content>
        <Footer>
          <Button onClick={this.toggleModal}>+</Button>
        </Footer>
      </Wrapper>
    );
  }
}

export default App;
