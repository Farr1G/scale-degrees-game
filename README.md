# scale-degrees-game

## Description
A game written in JavaScript there one guesses notes based on their position in a given scale. It's a remake of "Chord/Scale Deegres" mode from a mobile app "Music Theory Helper". The reasons I'm doing this project is that I need to learn and practice JavaScript.

## Naming conventions
The project uses [this naming conventions](https://github.com/ktaranov/naming-convention/blob/master/JavaScript%20Name%20and%20Coding%20Conventions.md), unless otherwise stated.

## Features
- A website as an iterface
- Export option of a round history in `.csv` format
- Statistic after the end of round

## Game flow
1. An user opens the site
2. The user configures an upcoming round
3. The user presses the `Run` button and games starts
4. The game randomly chooses a root note, a scale deegre and if corresponding options were chosen an alteration sign and a scale (for now, major or minor)
5. The user inputs their answer (possibly, on a specialized virtual keybord)
6. If the answer is correct, jump on the step 4. If not, give player a few more attempts. Their amount were specifed on the step 2
7. After some amount of questions, errors or because of the user's wish (specifed on the step 2) the round ends
8. A statistic of round is shown
9. The user can export the statistic and a round history

## UI style
[To be done]