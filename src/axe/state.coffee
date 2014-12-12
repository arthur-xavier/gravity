# src/axe/state.coffee

class Axe.State extends Axe.Class

  paused: false

  components: []

  dispatch: (event, args) ->
    @components.forEach (o) ->
      o[event] args if o? and typeof o[event] == "function"

  enter: ->
  exit: ->

  pause: ->
  resume: ->

  resize: ->
    
  
  update: ->
    @dispatch 'update'
