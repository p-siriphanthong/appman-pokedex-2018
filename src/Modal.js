import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import icon from "./search.png";

const Wrapper = styled.div`
  width: 1024px;
  height: 768px;
  background-color: #000000a3;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  background-color: white;
  margin: 34px auto 0;
  width: 900px;
  height: 700px;
  padding: 15px;
  box-sizing: border-box;
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Search = styled.input.attrs({
  placeholder: "Find pokemon"
})`
  font-family: "Gaegu";
  font-size: 2em;
  font-weight: 300;
  width: 100%;
  padding: 10px;
  padding-right: 65px;
  box-sizing: border-box;
`;

const SearchIcon = styled.div`
  background-image: url(${icon});
  background-size: cover;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Content = styled.div`
  height: calc(100% - 74px);
  overflow-y: scroll;
`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:3030/api/cards")
      .then(res => {
        this.setState({ cards: res.data.cards });
      })
      .catch(error => {
        console.log(error);
      });
  };

  filterCard = event => {
    axios
      .get("http://localhost:3030/api/cards?name=" + event.target.value)
      .then(res => {
        this.setState({ cards: res.data.cards });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Wrapper onClick={this.props.onClick}>
        <ModalWrapper onClick={e => e.stopPropagation()}>
          <SearchWrapper>
            <Search onChange={this.filterCard} />
            <SearchIcon />
          </SearchWrapper>
          <Content>
            {this.state.cards.map((card, index) =>
              !this.props.currentCards.find(
                element => element.id === card.id
              ) ? (
                <Card
                  key={index}
                  width={"100%"}
                  card={card}
                  button={"Add"}
                  event={e => this.props.addCard(card)}
                />
              ) : (
                ""
              )
            )}
          </Content>
        </ModalWrapper>
      </Wrapper>
    );
  }
}

export default Modal;
