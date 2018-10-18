export class Game {
  constructor() {
    this.keyArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r' ,'s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    this.keyCodeArray = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88 ,89, 90];
    this.health = 5;
    this.enemyHealth = 5;
    this.randomKey;
    this.keyCode;
    this.currentAction;
    this.currentActionCancel;
    this.currentText;
    this.warriorText; 
  }

  startGame() {
    this.gameFlow();
  }

  getRandomKey() {
    let randomNumber = Math.floor(Math.random() * this.keyArray.length);
    this.randomKey = this.keyArray[randomNumber];
    this.keyCode = this.keyCodeArray[randomNumber];
  }

  gameFlow() {
    this.enemyAttack();
  }

  emptyFunction() {
  }

  playerDodge() { 
    // function for player to dodge.
    clearTimeout(this.currentAction);
    this.getRandomKey();
    this.currentActionCancel = this.playerDodgeSuccess;
    this.currentText = `Press "${this.randomKey}" to dodge!`;
    this.warriorText = this.randomKey; 
    //keydown event
    
    this.currentAction = setTimeout(() => {
      this.enemyAttackHit();
    }, 3000);

  }

  playerDodgeSuccess() {
    clearTimeout(this.currentAction);
    this.keyCode = null;
    this.randomKey = null;
    this.currentActionCancel = this.emptyFunction;
    this.currentText = 'You have successfully dodged!';
    this.currentAction = setTimeout(() => {
      this.playerAttack();
    }, 1500);
  }

  playerAttack() {
    clearTimeout(this.currentAction);
    this.getRandomKey();
    this.currentText = `Counterattack! Press "${this.randomKey}" to attack!`;
    this.currentActionCancel = this.playerAttackSuccess;
    this.currentAction = setTimeout(() => {
      this.currentText = "You missed the enemy!";
      this.enemyAttack();
    }, 3000);
  }

  playerAttackSuccess() {
    clearTimeout(this.currentAction);
    this.keyCode = null;
    this.randomKey = null;
    this.currentActionCancel = this.emptyFunction;
    this.currentText = "You hit the enemy!";
    this.enemyHealth--;
    this.currentAction = setTimeout(() => {
      if (this.gameOverChecker()) {
        this.gameOver();
      } else {
        this.enemyAttack();
      }   
    }, 2000);
  }

  enemyAttack() {
    this.currentText = "Enemy is trying to attack you!";
    clearTimeout(this.currentAction);
    this.currentAction = setTimeout(() => {
      this.playerDodge();
    }, 2000);
  }

  enemyAttackHit() {
    clearTimeout(this.currentAction);
    this.health--;
    this.currentText = "You've been hit!";
    this.currentAction = setTimeout(() => {
      if (this.gameOverChecker()) {
        this.gameOver();
      } else {
        this.enemyAttack();
      }   
    }, 2000);
  }

  gameOverChecker() {
    if (this.enemyHealth < 1 || this.health < 1) {
      return true;
    } else {
      return false;
    }
  }

  gameOver() {
    if (this.enemyHealth < 1) {
      this.currentText = "You win!";
    } else if (this.health < 1) {
      this.currentText = "You are dead!";
    }
    setTimeout(() => {
      location.reload();
    }, 3000);
  }


}