import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import characters from "./characters.json";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    characters,
    score: 0,
    highscore: 0,
  };

  //on click on character, determine if previously clicked (click = true)
  ifClicked = (character, index) => {
    if (character.clicked) {
      // alert(`Game Over :( \nscore: ${this.state.score}`);
      this.restartGame()
    }
    else {
      let { score, characters } = this.state;
      score++;
      characters[index].clicked = true;
      const shuffledCharacters = this.shuffleCharacters(characters);
      this.setState({
        score,
        characters: shuffledCharacters
      })
    }
  }

  // fail = () => {

  // }

  restartGame = () => {
    //compare score to highScore and update highScore if score is higher + update score to 0 + shuffle
    let { score, highscore } = this.state;
    if (score > highscore) {
      highscore = score
    }
    //shuffle characters if you feel really ambitious
    this.setState({
      score: 0,
      highscore,
      characters
    })
  }

  shuffleCharacters = (characters) => {
    var currentIndex = characters.length, temporaryValue, randomIndex;
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
      <Wrapper>
        <Navbar>
          <div className="title">
            Kat's Clicky Game!
          </div>
          {/* <div className="alert">
            
          </div> */}
          <div className="scorecard">
            Score = {this.state.score}
            <div className="high">
              High Score = {this.state.highscore}
            </div>
          </div>
        </Navbar>
        <Header>Click on any baddass character, but click on her twice and you lose!</Header>
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
    );
  }
}

export default App;

