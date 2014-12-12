# src/axe/class.coffee

class Axe.Class
  @constructors: {}
  @include: (o, callback) ->
    @prototype[k] = v for k, v of o.prototype when k isnt 'name' and k isnt 'constructor'
    @constructors[o.name] = o.constructor if o.constructor and o.name
    (o.components.forEach (c) => @component c.component, c.callback) if o.components
    as @prototype, callback if callback

  @component: (o, callback) ->
    @components = @components or []
    @components.push { component: o, callback: callback }

  @property: (name, value = null) ->
    @prototype[name] = value

  property: (name, value = null) ->
    @[name] = value

  constructor: (args) ->
    for k, c of @constructor.constructors
      #c.call @, args
      c.call @

    if @constructor.components
      for c in @constructor.components
        @[c.component.label] = new c.component args
        @[c.component.label].parent = @
        as @[c.component.label], c.callback if c.callback

    @init() if @init
