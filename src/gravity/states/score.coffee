# src/gravity/states/score.coffee

class States.Score extends Axe.State
    @property 'scroll'
    @property 'scoreboard'
    @property 'pressSpace'
    @property 'highscore'
    @property 'newHighScore', false

    constructor: (@score, @scroll) ->
      @scoreboard = document.getElementById 'scoreboard'
      @pressSpace = document.getElementById 'press-space'
      @highScore = document.getElementById 'highscore'

    # show title and description
    enter: ->
      @scoreboard.style.display = 'block'
      @pressSpace.style.display = 'block'
      @highScore.style.display = 'block'

      # set highscore cookie
      if typeof Storage != "undefined"
        @highScore.value = (window.localStorage.getItem 'highscore') or 0
        if @score > @highScore.value
          @highScore.value = @score
          @newHighScore = true
        window.localStorage.setItem 'highscore', @highScore.value

      # when any key is pressed, jump to the game
      as (new Axe.Keyboard @), ->
        @onKeyUp = (key) ->
          if key == 32
            game.states.unshift new States.Menu @state.scroll
            game.next()

    # hide title and description and destroy Keyboard
    exit: ->
      @scoreboard.style.display = 'none'
      @pressSpace.style.display = 'none'
      @highScore.style.display = 'none'
      @dispatch 'destroy'

    update: ->
      @scroll = (@scroll + 1)%400
      game.buffer.style.backgroundPosition = "0px #{@scroll}px"

      @scoreboard.innerHTML = "Your score was<br /><br />#{@score}"
      @pressSpace.innerHTML = "Press space to try again"
      @highScore.innerHTML =
        if typeof Storage != "undefined" then "#{if @newHighScore then "NEW" else ""} High Score: #{@highScore.value}" else ""


    # resize and reposition the title and description texts
    resize: ->
      @scoreboard.style.top = "#{game.canvas.height / 3}px"
      @scoreboard.style.fontSize = "#{game.pixelSize / 2}em"
      
      @pressSpace.style.top = "#{game.canvas.height / 3 * 2}px"
      @pressSpace.style.fontSize = "#{game.pixelSize / 5}em"

      @highScore.style.top = "#{game.canvas.height / 5 * 4}px"
      @highScore.style.fontSize = "#{game.pixelSize / 4}em"      
