window.MOBILE = false;
(function() {
  var PlanetColors,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Components = new Object;

  Components.Physics = (function(_super) {
    __extends(Physics, _super);

    Physics.label('physics');

    Physics.property("position", new Vector);

    Physics.property("rotation", 0);

    Physics.property('velocity');

    Physics.property('angularVelocity', 0);

    Physics.property('radius', 3);

    Physics.property('mass', 1);

    Physics.property('gravityField', 6);

    function Physics(state) {
      this.state = state;
      Physics.__super__.constructor.call(this, this.state);
      this.velocity = new Vector;
    }

    Physics.prototype.update = function() {
      this.state.components.filter(function(o) {
        return (o != null) && o.constructor.name === "Physics";
      }).forEach((function(_this) {
        return function(o) {
          var d, f, normal, r, theta;
          if (o.id !== _this.id && o !== null) {
            r = Math.max(_this.radius, o.radius);
            d = o.position.distance(_this.position);
            f = d - _this.radius < r * _this.gravityField ? _this.mass * o.mass / (d * d) : 0;
            if (d - _this.radius < r) {
              f = 0;
              normal = o.position.sub(_this.position).normalize().mul(-1);
              theta = Math.acos(_this.velocity.dot(normal) / _this.velocity.length());
              _this.velocity.rotate(theta);
              if (_this.parent.constructor.name === "Player" || o.parent.constructor.name === "Player") {
                _this.state.collided();
              }
            }
            return _this.velocity._add(_this.position.sub(o.position).normalize().mul(-f));
          }
        };
      })(this));
      this.position._add(this.velocity);
      return this.rotation += this.angularVelocity;
    };

    return Physics;

  })(Axe.Component);

  Components.Planet = (function(_super) {
    __extends(Planet, _super);

    Planet.label('planet');

    Planet.property('passed', false);

    Planet.component(Components.Physics);

    Planet.component(Axe.Renderable, function() {
      this.property('style');
      this.property('gravityField', true);
      return this.render = bind(this.parent, function() {
        this.render.context.save();
        this.render.context.translate(this.physics.position.x, this.physics.position.y);
        this.render.context.rotate(this.physics.rotation);
        this.render.context.fillStyle = this.render.style;
        this.render.context.fillRect(-this.physics.radius, -this.physics.radius, this.physics.radius * 2, this.physics.radius * 2);
        if (this.render.gravityField) {
          this.render.context.beginPath();
          this.render.context.setLineDash([2, 3]);
          this.render.context.rotate(-this.physics.rotation * 0.75);
          this.render.context.arc(0, 0, this.physics.radius * this.physics.gravityField, 0, 2 * Math.PI, false);
          this.render.context.lineWidth = 0.5;
          this.render.context.strokeStyle = 'white';
          this.render.context.stroke();
        }
        return this.render.context.restore();
      });
    });

    function Planet(state) {
      this.state = state;
      Planet.__super__.constructor.call(this, this.state);
    }

    Planet.prototype.update = function() {
      if (this.physics.position.y > game.canvas.height / game.pixelSize + this.physics.radius * this.physics.gravityField || this.physics.position.y < -this.physics.radius * this.physics.gravityField || this.physics.position.x > game.canvas.width / game.pixelSize + this.physics.radius * this.physics.gravityField || this.physics.position.x < -this.physics.radius * this.physics.gravityField) {
        this.destroy();
      }
      return this.physics.velocity.y = this.physics.y_velocity;
    };

    return Planet;

  })(Axe.Component);

  Components.Player = (function(_super) {
    __extends(Player, _super);

    Player.label('player');

    Player.include(Components.Planet);

    Player.property('acceleration', 0.033);

    Player.property('torque', 0.05);

    Player.property('closest', 75);

    if (!window.MOBILE) {
      Player.component(Axe.Keyboard, function() {
        return this.update = bind(this.parent, function() {
          if (this.keyboard.keyDown(38)) {
            this.physics.velocity.y -= this.acceleration;
          } else if (this.keyboard.keyDown(40)) {
            this.physics.velocity.y += this.acceleration;
          }
          if (this.keyboard.keyDown(39)) {
            this.physics.velocity.x += this.acceleration;
            return this.physics.rotation += (Math.PI / 8 - this.physics.rotation) * this.torque;
          } else if (this.keyboard.keyDown(37)) {
            this.physics.velocity.x -= this.acceleration;
            return this.physics.rotation += (Math.PI / -8 - this.physics.rotation) * this.torque;
          } else {
            return this.physics.rotation += (0 - this.physics.rotation) * this.torque;
          }
        });
      });
    } else if (window.DeviceOrientationEvent) {
      Player.component(Axe.Orientation, function() {
        return this.onMotion = bind(this.parent, function(data) {
          if (data.beta > 1) {
            this.physics.velocity.y -= this.acceleration;
          } else if (data.beta < -1) {
            this.physics.velocity.y += this.acceleration;
          }
          if (data.alpha > 1) {
            this.physics.velocity.x += this.acceleration;
            return this.physics.rotation += (Math.PI / 8 - this.physics.rotation) * this.torque;
          } else if (data.alpha < -1) {
            this.physics.velocity.x -= this.acceleration;
            return this.physics.rotation += (Math.PI / -8 - this.physics.rotation) * this.torque;
          } else {
            return this.physics.rotation += (0 - this.physics.rotation) * this.torque;
          }
        });
      });
    } else {
      alert("Device orientation not supported.");
      throw new Error("Device orientation not supported.");
    }

    function Player(state) {
      this.state = state;
      Player.__super__.constructor.call(this, this.state);
      this.render.gravityField = false;
    }

    Player.prototype.update = function() {
      var ps, r;
      this.closest = 75;
      this.state.components.filter(function(o) {
        return (o != null) && o.id !== this.id && o.constructor.name === "Planet";
      }).forEach((function(_this) {
        return function(o) {
          _this.closest = Math.min(_this.closest, _this.physics.position.distance(o.physics.position, 75));
          if (!o.passed && o.physics.position.y > _this.physics.position.y) {
            o.passed = true;
            return _this.state.scored();
          }
        };
      })(this));
      ps = game.pixelSize;
      r = this.physics.radius;
      as(this.physics, function() {
        if (this.position.x < r) {
          this.position.x = r;
          this.velocity.x = 0;
        }
        if (this.position.y < r) {
          this.position.y = r;
          this.velocity.y = 0;
        }
        if (this.position.x > game.canvas.width / ps - r) {
          this.position.x = game.canvas.width / ps - r;
          this.velocity.x = 0;
        }
        if (this.position.y > game.canvas.height / ps + r) {
          return this.state.collided();
        }
      });
      this.render.color.r = Math.lerp(1.5, 0.0, this.closest / 75);
      this.render.color.g = Math.lerp(0.0, 1.0, this.closest / 75);
      this.render.color.b = Math.lerp(0.0, 1.0, this.closest / 75);
      this.render.style = "rgb(" + (Math.round(this.render.color.r * 255)) + ", " + (Math.round(this.render.color.g * 255)) + ", " + (Math.round(this.render.color.b * 255)) + ")";
      this.physics.velocity._mul(new Vector(0.98));
      return this.physics.angularVelocity *= 0.95;
    };

    return Player;

  })(Axe.Component);

  Components.ScoreTexts = (function(_super) {
    __extends(ScoreTexts, _super);

    ScoreTexts.label('scoreTexts');

    ScoreTexts.property('scoredText', 0);

    ScoreTexts.property('opacity', 0);

    ScoreTexts.property('rotation', 0);

    ScoreTexts.property('rotationTarget', 0);

    ScoreTexts.property('size', 0);

    ScoreTexts.property('sizeTarget', 0);

    ScoreTexts.property('text', '');

    ScoreTexts.prototype.texts = {
      1: "Newbie",
      5: "Rookie",
      10: "Well...",
      15: "You're getting it",
      20: "Go on!",
      25: "Keep calm and play",
      30: "Good!",
      40: "Nice!",
      50: "Awesome!",
      75: "Superb!",
      100: {
        text: "Godlike!",
        color: "red"
      },
      125: {
        text: "Beyond Godlike!",
        color: "orange"
      },
      150: "Bloody Hell!",
      200: "OMG!!!",
      250: "Holy Chips!",
      300: "You're an Asian!",
      400: "Universe Limits...",
      500: {
        text: "GG!",
        color: "red"
      }
    };

    ScoreTexts.prototype.scored = function() {
      var t;
      this.opacity = 1.0;
      this.rotation = random(-Math.PI / 12, Math.PI / 12);
      this.rotationTarget = random(-Math.PI / 9, Math.PI / 9);
      this.size = random(this.sizeTarget / 2, this.sizeTarget * 2 / 3);
      t = this.texts[this.state.score];
      this.text = typeof t === "object" ? t.text : t || "";
      return this.scoredText.style.color = typeof t === "object" ? t.color : "white";
    };

    ScoreTexts.prototype.update = function() {
      var r;
      if (this.opacity > 0.0) {
        this.opacity -= (1.0 - this.opacity) * 0.01 + 0.01;
      }
      this.rotation += (this.rotationTarget - this.rotation) * 0.05;
      this.size += (this.sizeTarget - this.size) * 0.25;
      r = "rotate(" + this.rotation + "rad)";
      this.scoredText.style.top = "" + (game.canvas.height * 2 / 9) + "px";
      this.scoredText.style.MozTransform = r;
      this.scoredText.style.WebkitTransform = r;
      this.scoredText.style.OTransform = r;
      this.scoredText.style.transform = r;
      this.scoredText.style.fontSize = "" + this.size + "px";
      this.scoredText.style.opacity = this.opacity;
      return this.scoredText.innerHTML = this.text;
    };

    ScoreTexts.prototype.resize = function(ratio) {
      this.sizeTarget = game.pixelSize * 8;
      return this.size = game.pixelSize * 9;
    };

    function ScoreTexts(state) {
      this.state = state;
      ScoreTexts.__super__.constructor.call(this, this.state);
      this.scoredText = document.getElementById('scored-text');
      this.scoredText.style.display = 'block';
      this.resize(1);
    }

    ScoreTexts.prototype.destructor = function() {
      return this.scoredText.style.display = 'none';
    };

    return ScoreTexts;

  })(Axe.Component);

  window.States = new Object;

  States.Menu = (function(_super) {
    __extends(Menu, _super);

    Menu.property('title');

    Menu.property('description');

    Menu.property('pressSpace');

    Menu.property('scroll');

    function Menu() {
      this.title = document.getElementById('title');
      this.description = document.getElementById('description');
      this.pressSpace = document.getElementById('press-space');
    }

    Menu.prototype.enter = function() {
      this.title.style.display = 'block';
      this.description.style.display = 'block';
      this.pressSpace.style.display = 'block';
      return as(new Axe.Keyboard(this), function() {
        return this.onKeyUp = function(key) {
          if (key === 32) {
            game.states.unshift(new States.Game(this.state.scroll));
            return game.next();
          }
        };
      });
    };

    Menu.prototype.exit = function() {
      this.title.style.display = 'none';
      this.description.style.display = 'none';
      this.pressSpace.style.display = 'none';
      return this.dispatch('destroy');
    };

    Menu.prototype.update = function() {
      this.scroll = (this.scroll + 1) % 400;
      game.buffer.style.backgroundPosition = "0px " + this.scroll + "px";
      return this.pressSpace.innerHTML = "Press space to play";
    };

    Menu.prototype.resize = function() {
      this.title.style.top = "" + (game.canvas.height / 3) + "px";
      this.title.style.fontSize = "" + game.pixelSize + "em";
      document.getElementById('arrow-keys').style.width = "" + (game.canvas.height / 6) + "px";
      this.description.style.top = "" + (game.canvas.height / 5 * 3) + "px";
      this.description.style.left = "" + (window.innerWidth / 2 - game.canvas.width / 2) + "px";
      this.description.style.width = "" + (game.canvas.width - 8) + "px";
      this.description.style.fontSize = "" + (game.pixelSize / 5) + "em";
      this.pressSpace.style.top = "" + (game.canvas.height / 2) + "px";
      return this.pressSpace.style.fontSize = "" + (game.pixelSize / 5) + "em";
    };

    return Menu;

  })(Axe.State);

  PlanetColors = Axe.Colors.filter(function(c) {
    return c !== 'black' && c !== 'cyan' && c !== 'aqua';
  });

  States.Game = (function(_super) {
    __extends(Game, _super);

    Game.property('score');

    Game.property('scroll');

    Game.property('scoreboard');

    Game.property('interval');

    function Game(scroll) {
      this.scroll = scroll;
      this.scoreboard = document.getElementById('scoreboard');
    }

    Game.prototype.enter = function() {
      var spawnPlanet;
      this.score = 0;
      this.scoreboard.style.display = 'block';
      as(new Components.Player(this), function() {
        this.render.color = {
          r: 0,
          g: 1.0,
          b: 1.0
        };
        this.render.style = 'rgb(0, 255, 255)';
        this.physics.position = new Vector(0.5 / game.pixelSize, 0.75 / game.pixelSize, true);
        this.physics.rotation = 0;
        this.physics.radius = 6;
        return this.physics.mass = 7;
      });
      new Components.ScoreTexts(this);
      spawnPlanet = (function(_this) {
        return function() {
          return as(new Components.Planet(_this), function() {
            this.render.style = PlanetColors.pick();
            this.physics.radius = random(8, 15);
            this.physics.mass = random(3.5, 6);
            this.physics.rotation = random(-Math.PI, Math.PI);
            this.physics.angularVelocity = random(-Math.PI / 100, Math.PI / 100);
            this.physics.velocity = new Vector(random(-0.05, 0.05), random(1.25, 1.5));
            this.physics.y_velocity = this.physics.velocity.y;
            this.physics.position = new Vector(random(0.1, 0.9) / game.pixelSize, 0, true);
            return this.physics.position.y = -this.physics.radius * this.physics.gravityField;
          });
        };
      })(this);
      return this.interval = interval(2000, spawnPlanet);
    };

    Game.prototype.collided = function() {
      game.states.unshift(new States.Score(this.score, this.scroll));
      return game.next();
    };

    Game.prototype.scored = function() {
      this.score++;
      return this.dispatch('scored');
    };

    Game.prototype.exit = function() {
      this.dispatch('destroy');
      this.scoreboard.style.display = 'none';
      return clearInterval(this.interval);
    };

    Game.prototype.update = function() {
      this.dispatch('update');
      this.scoreboard.innerHTML = this.score;
      this.scroll = (this.scroll + 2) % 400;
      return game.buffer.style.backgroundPosition = "0px " + this.scroll + "px";
    };

    Game.prototype.resize = function(previousSize) {
      this.dispatch('resize');
      this.scoreboard.style.fontSize = "" + (game.pixelSize * 3 / 5) + "em";
      return this.scoreboard.style.top = "40px";
    };

    return Game;

  })(Axe.State);

  States.Score = (function(_super) {
    __extends(Score, _super);

    Score.property('scroll');

    Score.property('scoreboard');

    Score.property('pressSpace');

    Score.property('highscore');

    Score.property('newHighScore', false);

    function Score(score, scroll) {
      this.score = score;
      this.scroll = scroll;
      this.scoreboard = document.getElementById('scoreboard');
      this.pressSpace = document.getElementById('press-space');
      this.highScore = document.getElementById('highscore');
    }

    Score.prototype.enter = function() {
      this.scoreboard.style.display = 'block';
      this.pressSpace.style.display = 'block';
      this.highScore.style.display = 'block';
      if (typeof Storage !== "undefined") {
        this.highScore.value = (window.localStorage.getItem('highscore')) || 0;
        if (this.score > this.highScore.value) {
          this.highScore.value = this.score;
          this.newHighScore = true;
        }
        window.localStorage.setItem('highscore', this.highScore.value);
      }
      return as(new Axe.Keyboard(this), function() {
        return this.onKeyUp = function(key) {
          if (key === 32) {
            game.states.unshift(new States.Menu(this.state.scroll));
            return game.next();
          }
        };
      });
    };

    Score.prototype.exit = function() {
      this.scoreboard.style.display = 'none';
      this.pressSpace.style.display = 'none';
      this.highScore.style.display = 'none';
      return this.dispatch('destroy');
    };

    Score.prototype.update = function() {
      this.scroll = (this.scroll + 1) % 400;
      game.buffer.style.backgroundPosition = "0px " + this.scroll + "px";
      this.scoreboard.innerHTML = "Your score was<br /><br />" + this.score;
      this.pressSpace.innerHTML = "Press space to try again";
      return this.highScore.innerHTML = typeof Storage !== "undefined" ? "" + (this.newHighScore ? "NEW" : "") + " High Score: " + this.highScore.value : "";
    };

    Score.prototype.resize = function() {
      this.scoreboard.style.top = "" + (game.canvas.height / 3) + "px";
      this.scoreboard.style.fontSize = "" + (game.pixelSize / 2) + "em";
      this.pressSpace.style.top = "" + (game.canvas.height / 3 * 2) + "px";
      this.pressSpace.style.fontSize = "" + (game.pixelSize / 5) + "em";
      this.highScore.style.top = "" + (game.canvas.height / 5 * 4) + "px";
      return this.highScore.style.fontSize = "" + (game.pixelSize / 4) + "em";
    };

    return Score;

  })(Axe.State);

  window.onload = function() {
    window.game = new Axe.Game({
      name: 'gravity'
    });
    game.setup(function() {
      this.pixelSize = 5;
      this.resize = function(previousSize) {
        var ratio;
        this.canvas.width = this.canvas.height = Math.min(window.innerWidth, window.innerHeight);
        window.SIZE = new Vector(this.canvas.width, this.canvas.height);
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = "" + (window.innerWidth / 2 - this.canvas.width / 2) + "px";
        ratio = window.SIZE.div(previousSize);
        return this.pixelSize *= ratio.x;
      };
      return this.flip = function() {
        return this.context.drawImage(this.buffer, 0, 0, this.canvas.width / this.pixelSize, this.canvas.height / this.pixelSize, 0, 0, this.canvas.width, this.canvas.height);
      };
    });
    game.states.push(new States.Menu);
    return game.start();
  };

  if (window.MOBILE) {
    document.addEventListener("deviceready", window.onload, false);
  }

}).call(this);
