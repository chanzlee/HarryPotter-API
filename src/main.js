import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Game } from './keyboardwarrior';



/* eslint-disable no-unused-vars */
$(document).ready(function() {


  let newGame = new Game();
  newGame.startGame();

  let text = setInterval(() => {
    $("#userHealth").text(newGame.health); 
    $("#enemyHealth").text(newGame.enemyHealth);
    $("#combatText").text(newGame.currentText);
  }, 50);


  document.addEventListener("keydown", keyDownHandler, false);

  function keyDownHandler(e) {
    $("#userText").text(e.key);
    if (e.keyCode == newGame.keyCode) {
      clearTimeout(newGame.currentAction);
      newGame.currentActionCancel();
    }
  }
});
