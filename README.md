# Pitchy to Perfect
An app for developing a musical ear! 
Hear a note and guess which one it is from four possible options.
Train your ears and mind to be pitch perfect!

### A user can:
- sign up
- login
- view scoreboard
- start/play game

### Game play:
- On start a note will play.
- The user will be able to choose between 4 notes displayed to pick the correct note, matching the tone played.
- When the correct note is chosen, the button will turn green for a moment and their current score will increase by one. After the pause, the next note will play and the game continues.
- When the wrong note is chosen, the button will turn red for a moment and their current score will reset. If the user is logged in the game will continue normally. If the user is not logged in they will be prompted with a "sign up to track high score" button which redirects to the sign up form. Blow that will be a "continue playing" button. 

### A logged in user, in addition to above, can:
- view their highscore which will be displayed next to current score.
- Access the options menu

### Options Menu, here a user can:
- Change what notes will come up in the game. This will be a drop down menu with various options such as, no flat or sharp notes, certain scales, ect.
- Change the volume. This will be represented by a horizontal slider.
- Ativate dark mode. This will be a box that can be checked.
- Delete account. This will be a red button which will redirect the user to a confirmation page where a user will be able to delete their account.

---

### Post MVP:
After further improving styling I would then move on to add functionality to game by,
adding a menu with various options to manipulate game play. 
Functionality I'd like to add to the options menu would be
I'd also like to eventually like to add game complexity by arpeggiating over chords or scales and have the user guess them.

---
### Technologies:
I will be using a Django backend with a PostgreSQL database and a react front end with the Semantic UI framework. For handeling audio file functionality, I will be using "use-sound"; a react hook made for handling sound effects.

---

## wireframes:

![landing-page](./readme-assets/landing-page.png)

![gameplay](./readme-assets/gameplay.png)

![game-over](./readme-assets/game-over.png)

![game-over-loggedin](./readme-assets/game-over-loggedin.png)

![signup](./readme-assets/signup.png)

![login](./readme-assets/login.png)

![scoreboard](./readme-assets/scoreboard.png)

![options](./readme-assets/options.png)

---

## ERD:

![ERD](./readme-assets/ERD.png)
