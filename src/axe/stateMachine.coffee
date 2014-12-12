# src/axe/stateMachine.coffee

class Axe.StateMachine extends Axe.Class

  @states: []

  start: (args...) ->
    @enter args...
    @onStart args... if typeof @onStart == "function"

  update: (args...) ->
    @states.top().update args... if @states.top() and !@states.top().paused

  end: (args...) ->
    @onEnd args... if typeof @onEnd == "function"
    # exit current state
    @states.top().exit args... if @states.top()
    # exit paused states
    @states
    .filter (s) -> s.paused
    .forEach (s) -> s.exit args... if s
    # clear @states array
    @states.splice 0, @states.length

  enter: (args...) ->
    if @states.top()
      @states.top().enter args...
      @states.top().resize args...

  next: (args...) ->
    @states.pop().exit args... if @states.top()
    # ente next state
    @enter args...

  pause: (args...) ->
    if @states.top()
      @states.top().paused = true
      @states.top().pause args...

  resume: (args...) ->
    if @states.top()
      @states.top().paused = false
      @states.top().resume args...

  resize: (args...) ->
    @states.top().resize args... if @states.top()
    @states
    .filter (s) -> s.paused
    .forEach (s) -> s.resize args... if s
