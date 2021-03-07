Memory Game

1. landing page, load upon start button click function(number of cells, pic type)
2. randomize pictures: decide latew how to do
3. Q: event listener- what elements/s? where to transfer the result to?
4. Q: what events end the game: 1) game time is over 2) success in all rounds before end time
5. CSS

---

- initializing the board (2)

  - create grid
  - randomize the element/pictures
  - add class

- the game (3)

  - state object:

    - how many cards are open
    - sucsess
    - failing

  - event listner:

    - add 1 to state.how many cards are open
    - fliping the card

    - how many cards are open?
    - if state.how many cards are open === 2:
      - round timer
        - when starts: disable btns
        - when ends: able btns , - reset open cards
      - check if cards classes are equle:
        - if so:
          - remove the cards
          - updte sucsses
          - check if sucsses === x\*y : if so, game-end(win)
        - else
          - flip them
          - update failing
          - reset open cards
    - if state.how many cards are open === 1: do nothing

  - game timer
    - start on load
    - when ends, check if sucsses = 6:
      - if so: game-end(win)
      - else: game-end(game-over)

- game-end(winOrGameOver){ (4)
  - show msg overlay
  - show btn: if usr click it:
    - destroy the board
    - call initializing

}
