# src/axe/component.coffee

class Axe.Component extends Axe.Class
  #
  @label: (@label) ->

  id: null

  #
  constructor: (@state) ->
    super @state
    @state.components.push @
    @id = @state.components.length - 1

  destroy: ->
    if @constructor.components
      @[c.component.label].destroy() for c in @constructor.components

    @destructor() if typeof @destructor == "function"

    delete @state.components[@id]
    @state.components.slice @id, 1
  