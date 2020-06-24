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
    message: "Click any childhood heroine!"
  };

  //on click on character, determine if previously clicked (click = true)
  ifClicked = (character, index) => {
    if (character.clicked) {
      this.restartGame()
    }
    else {
      let { score, characters } = this.state;
      score++;
      characters[index].clicked = true;
      const shuffledCharacters = this.shuffleCharacters(characters);
      this.setState({
        score,
        characters: shuffledCharacters,
        message: "Yes! You did it!"
      })
    }
  }


  restartGame = () => {
    //compare score to highScore and update highScore if score is higher + update score to 0 + shuffle
    let { score, highscore } = this.state;
    if (score > highscore) {
      highscore = score
    }

    this.setState({
      score: 0,
      highscore,
      characters: this.shuffleCharacters(characters),
      message: "Loser! Try Again!"
    })

    console.log(this.state.characters)

    const resetCharacters = this.state.characters.map((character) => {
      character.clicked = false;

      return character;
    });

    console.log(resetCharacters)

    // for (let i = 0; i < characters.length; i++){
    //   this.setState{
    //     characters[i].clicked: false
    //   }
    // }
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

