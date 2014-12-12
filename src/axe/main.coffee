# src/axe/main.coffee

window.Axe = new Object

require 'colors'
require 'vector'
require 'class'
require 'component'
require 'state'
require 'stateMachine'
require 'game'
require 'components/orientation'
require 'components/keyboard'
require 'components/renderable'

window.random = (x, y) ->
  return Math.random() if !x? and !y?
  return Math.random()*x if !y?
  Math.random()*(y - x) + x

Array.prototype.pick = ->
  @[Math.floor random 0, @length]
Array.prototype.top = ->
  @[@length - 1]

Math.lerp = (a, b, f) ->
  a + f * (b - a)

window.as = (object, callback) ->
  callback.call object

window.bind = (object, callback) ->
  callback.bind object

window.timeout = (time, callback) ->
  window.setTimeout callback, time

window.interval = (time, callback) ->
  window.setInterval callback, time

window.requestAnimationFrame = 
  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  (callback, e) ->
    window.setTimeout callback, 1000/60