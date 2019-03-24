import React, { Component } from "react";
import styled from "styled-components";
import cute from "./cute.png";

const Wrapper = styled.div`
  width: ${props => props.width};
  padding: 10px;
  display: inline-block;
  box-sizing: border-box;
`;

const CardWrapper = styled.div`
  background-color: #f3f4f7;
  padding: 15px;
  box-shadow: 0 0 5px #d5d6dc;
  position: relative;

  &:hover {
    box-shadow: 0 0 5px #aeaeae;
  }
`;

const Button = styled.p`
  color: #dc7777;
  font-size: 1.5em;
  position: absolute;
  top: 10px;
  right: 15px;
  margin: 0;
  cursor: pointer;
  visibility: hidden;

  ${CardWrapper}:hover & {
    visibility: visible;
  }
`;

const Img = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  width: 150px;
  height: 209px;
  display: inline-block;
`;

const Content = styled.div`
  width: calc(100% - 150px);
  padding: 0 20px;
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
`;

const Name = styled.h1`
  font-family: "Gaegu";
  margin: 0;
  margin-bottom: 10px;
`;

const LevelWrapper = styled.div`
  max-width: 450px;
`;

const LevelName = styled.p`
  font-size: 1.2em;
  font-weight: 500;
  vertical-align: top;
  margin: 0;
  width: 25%;
  display: inline-block;
`;

const LevelTube = styled.div`
  width: 75%;
  height: 30px;
  background-color: #e4e4e4;
  border-radius: 20px;
  display: inline-block;
`;

const LevelTubeValue = styled.div`
  width: ${props => props.width}%;
  height: 30px;
  border-radius: 20px;
  background-color: #f3701a;
`;

const Cute = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 5px;
  margin-right: 5px;
  background-image: url(${cute});
  background-size: cover;
  display: inline-block;
`;

class Card extends Component {
  render() {
    let hp = this.props.card.hp > 100 ? 100 : 0;
    let atk =
      (this.props.card.attacks ? this.props.card.attacks.length : 0) * 50;
    let weak =
      (this.props.card.weaknesses ? this.props.card.weaknesses.length : 0) *
      100;
    let damage = 0;

    if (this.props.card.attacks) {
      this.props.card.attacks.forEach(obj => {
        if (!isNaN(parseInt(obj.damage))) {
          damage += parseInt(obj.damage);
        }
      });
    }

    let level = Math.floor((hp / 10 + damage / 10 + 10 - weak / 100) / 5);
    let cutes = [];
    for (let i = 0; i < level; i++) {
      cutes.push(<Cute key={i} />);
    }

    return (
      <Wrapper width={this.props.width}>
        <CardWrapper>
          <Img src={this.props.card.imageUrl} />
          <Content>
            <Name>{this.props.card.name}</Name>
            <LevelWrapper>
              <LevelName>HP</LevelName>
              <LevelTube>
                <LevelTubeValue width={hp} />
              </LevelTube>
              <LevelName>STR</LevelName>
              <LevelTube>
                <LevelTubeValue width={atk} />
              </LevelTube>
              <LevelName>WEAK</LevelName>
              <LevelTube>
                <LevelTubeValue width={weak} />
              </LevelTube>
            </LevelWrapper>
            {cutes}
          </Content>
          <Button onClick={this.props.event}>{this.props.button}</Button>
        </CardWrapper>
      </Wrapper>
    );
  }
}

export default Card;
