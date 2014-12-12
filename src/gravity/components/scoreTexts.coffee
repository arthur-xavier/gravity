# src/gravity/components/scoreTexts.coffee

class Components.ScoreTexts extends Axe.Component
  #
  @label 'scoreTexts'

  @property 'scoredText', 0
  @property 'opacity', 0
  @property 'rotation', 0
  @property 'rotationTarget', 0
  @property 'size', 0
  @property 'sizeTarget', 0
  @property 'text', ''

  texts:
    1: "Newbie"
    5: "Rookie"
    10: "Well..."
    15: "You're getting it"
    20: "Go on!"
    25: "Keep calm and play"
    30: "Good!"
    40: "Nice!"
    50: "Awesome!"
    75: "Superb!"
    100: { text: "Godlike!", color: "red" }
    125: { text: "Beyond Godlike!", color: "orange" }
    150: "Bloody Hell!"
    200: "OMG!!!"
    250: "Holy Chips!"
    300: "You're an Asian!"
    400: "Universe Limits..."
    500: { text: "GG!", color: "red" }

  #
  scored: ->
    @opacity = 1.0
    @rotation = random(-Math.PI / 12, Math.PI / 12)
    @rotationTarget = random(-Math.PI / 9, Math.PI / 9)
    @size = random(@sizeTarget / 2, @sizeTarget * 2/3)

    t = @texts[@state.score]

    @text = if typeof t == "object" then t.text else t or ""
    @scoredText.style.color = if typeof t == "object" then t.color else "white"

  update: ->
    @opacity -= (1.0 - @opacity)*0.01 + 0.01 if @opacity > 0.0
    @rotation += (@rotationTarget - @rotation)*0.05
    @size += (@sizeTarget - @size)*0.25

    r = "rotate(#{@rotation}rad)"
    @scoredText.style.top = "#{game.canvas.height * 2 / 9}px"
    @scoredText.style.MozTransform    = r
    @scoredText.style.WebkitTransform = r
    @scoredText.style.OTransform      = r
    @scoredText.style.transform       = r
    @scoredText.style.fontSize = "#{@size}px"
    @scoredText.style.opacity  = @opacity
    @scoredText.innerHTML = @text

  resize: (ratio) ->
    @sizeTarget = game.pixelSize * 8
    @size = game.pixelSize * 9

  #
  constructor: (@state) ->
    super @state
    @scoredText = document.getElementById 'scored-text'
    @scoredText.style.display = 'block'
    @resize 1

  destructor: ->
    @scoredText.style.display = 'none'