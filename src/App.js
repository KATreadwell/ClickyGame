import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Characters from "./characters.json";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    characters: [],
    score: 0,
    highscore: 0,
    message: "Click any childhood heroine!"
  };

  componentDidMount() {
    this.loadCharacters();
  }

  loadCharacters() {
    let characters = Characters.map(character => Object.assign({clicked: false}, character))
    characters = this.shuffleCharacters(characters);
    this.setState({
      characters
    });
  }

  //on click on character, determine if previously clicked (click = true)
  ifClicked = (character, index) => {
    if (character.clicked) {
      this.restartGame();
    }
    else {
      let { score, characters } = this.state;
      characters[index].clicked = true;
      this.setState({
        score: score + 1,
        characters: this.shuffleCharacters(characters),
        message: "Yes! You did it!"
      })
    }
  }

  restartGame = () => {
    //compare score to highScore and update highScore if score is higher + update score to 0 + shuffle
    let { score, highscore } = this.state;
    if (score > highscore) {
      highscore = score;
    }

    this.loadCharacters();

    this.setState({
      score: 0,
      highscore,
      message: "Loser! Try Again!"
    })
  }
  
  shuffleCharacters = (origCharacters) => {
    const characters = Array.from(origCharacters);
    let currentIndex = characters.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = characters[currentIndex];
      characters[currentIndex] = characters[randomIndex];
      characters[randomIndex] = temporaryValue;
    }
    return characters;
  }
 
  render() {
    return (
      <>
      <Navbar>
        <div className="title">
          Kat's Clicky Game!
      </div>
        <div className="alert">{this.state.message}</div>
        <div className="scorecard">
          Score = {this.state.score}
          <div className="high">
            High Score = {this.state.highscore}
          </div>
        </div>
      </Navbar>
      <Wrapper>
        <Header>Click on any character, but if you click her twice- you lose!</Header>
        <div className="container">
          {this.state.characters.map((character, index) => (
            <CharacterCard
              id={character.id}
              key={character.id}
              image={character.image}
              ifClicked={this.ifClicked}
              index={index}
              character={character}
            />
          ))}
        </div>
        <Footer>brought to you by KAT productions....we make terrible games!</Footer>
      </Wrapper>
      </>
    );
  }
}

export default App;

