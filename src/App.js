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
    highscore: 0
  };

  //on click on character, determine if previously clicked (click = true)
  ifClicked = (character, index) => {
    if (character.clicked) {
      this.restartGame()
    }
    else {
      let {score, characters} = this.state;
      score++;
      characters[index].clicked = true;
      const shuffledCharacters = this.shuffleCharacters(characters);
      this.setState({
        score,
        characters: shuffledCharacters
      })
    }
  } 
  
  restartGame = () => {
    //compare score to highScore and update highScore if score is higher + update score to 0 + shuffle
    let {score, highscore} = this.state;
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

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = characters[currentIndex];
    characters[currentIndex] = characters[randomIndex];
    characters[randomIndex] = temporaryValue;
  }

  return characters;
  }





  // gameOver = () => {
  //   if (this.state.score > this.state.highscore) {
  //     this.setState({highscore: this.state.score}, function() {
  //       console.log(this.state.highscore);
  //     });
  //   }
  //   this.state.characters.forEach(card => {
  //     card.count = 0;
  //   });
  //   alert(`Game Over :( \nscore: ${this.state.score}`);
  //   this.setState({score: 0});
  //   return true;
  // }

  // clickCount = id => {
  //   this.state.characters.find((o, i) => {
  //     if (o.id === id) {
  //       if(characters[i].count === 0){
  //         characters[i].count = characters[i].count + 1;
  //         this.setState({score : this.state.score + 1}, function(){
  //           console.log(this.state.score);
  //         });
  //         this.state.characters.sort(() => Math.random() - 0.5)
  //         return true; 
  //       } else {
  //         this.gameOver();
  //       }
  //     }
  //   });
  // }

  render() {
    return (
      <Wrapper>
        <Navbar score={this.state.score} highscore={this.state.highscore}>Kat's Clicky Game!</Navbar>
        <Header>Click on an image to earn points, but don't click on any image more than once!</Header>
        {/* <div className="container"> */}
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
        {/* </div> */}
        <Footer>brought to you by KAT productions....we make terrible games</Footer>
      </Wrapper>
    );
  }
}

export default App;

