# src/axe/vector.coffee

class Axe.Vector
  #
  x: 0
  y: 0

  #
  constructor: (@x = null, @y = null, screen = false) ->
    @x = 0 if !@x?
    @y = @x if !@y?
    if screen
      @x *= Axe.Game.instance.canvas.width
      @y *= Axe.Game.instance.canvas.height

  set: (x = null, y = null) ->
    if typeof x == "object" and x != null
      @x = x.x
      @y = x.y
    else
      if !x? then @x = 0 else @x = x
      if !y? then @y = @x else @y = y

  _add: (v) ->
    @x += v.x
    @y += v.y
    @
  add: (v) ->
    return new Axe.Vector @x+v.x, @y+v.y if typeof v == "object"
    new Axe.Vector @x+v, @y+v if typeof v == "number"

  _sub: (v) ->
    @x -= v.x
    @y -= v.y
    @
  sub: (v) ->
    return new Axe.Vector @x-v.x, @y-v.y if typeof v == "object"
    new Axe.Vector @x-v, @y-v if typeof v == "number"

  _mul: (v) ->
    @x *= v.x
    @y *= v.y
    @
  mul: (v) ->
    return new Axe.Vector @x*v.x, @y*v.y if typeof v == "object"
    new Axe.Vector @x*v, @y*v if typeof v == "number"

  _div: (v) ->
    @x *= v.x
    @y *= v.y
    @
  div: (v) ->
    return new Axe.Vector @x/v.x, @y/v.y if typeof v == "object"
    new Axe.Vector @x/v, @y/v if typeof v == "number"

  rotate: (angle) ->
    @x *= Math.cos(angle)
    @y *= Math.sin(angle)
    @

  dot: (v) ->
    @x*v.x + @y*v.y

  cross: (v) ->
    @x*v.y - @y*v.x

  normalize: ->
    l = @length()
    new Axe.Vector @x/l, @y/l

  length: ->
    Math.sqrt(@x*@x + @y*@y)

  distance: (v) ->
    x = @x - v.x
    y = @y - v.y
    Math.sqrt(x*x + y*y)
  distance2: (v) ->
    x = @x - v.x
    y = @y - v.y
    x*x + y*y

window.Vector = Axe.Vector
