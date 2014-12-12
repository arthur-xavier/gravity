# src/gravity/states/menu.coffee

class States.Menu extends Axe.State
    @property 'title'
    @property 'description'
    @property 'pressSpace'
    @property 'scroll'

    constructor: ->
      @title = document.getElementById 'title'
      @description = document.getElementById 'description'
      @pressSpace = document.getElementById 'press-space'

    # show title and description
    enter: ->
      @title.style.display = 'block'
      @description.style.display = 'block'
      @pressSpace.style.display = 'block'
      # when any key is pressed, jump to the game
      as (new Axe.Keyboard @), ->
        @onKeyUp = (key) ->
          if key == 32
            game.states.unshift new States.Game @state.scroll
            game.next()

    # hide title and description and destroy Keyboard
    exit: ->
      @title.style.display = 'none'
      @description.style.display = 'none'
      @pressSpace.style.display = 'none'
      @dispatch 'destroy'

    update: ->
      @scroll = (@scroll + 1)%400
      game.buffer.style.backgroundPosition = "0px #{@scroll}px"
      @pressSpace.innerHTML = "Press space to play"

    # resize and reposition the title and description texts
    resize: ->
      @title.style.top = "#{game.canvas.height / 3}px"
      @title.style.fontSize = "#{game.pixelSize}em"

      document.getElementById('arrow-keys').style.width = "#{game.canvas.height / 6}px"

      @description.style.top = "#{game.canvas.height / 5 * 3}px"
      @description.style.left = "#{window.innerWidth / 2 - game.canvas.width / 2}px"
      @description.style.width = "#{game.canvas.width - 8}px"
      @description.style.fontSize = "#{game.pixelSize / 5}em"

      @pressSpace.style.top = "#{game.canvas.height / 2}px"
      @pressSpace.style.fontSize = "#{game.pixelSize / 5}em"
