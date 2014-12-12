window.MOBILE = false;
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.Axe = new Object;

  Axe.Colors = ['aliceblue', 'black', 'antiquewhite', 'navy', 'aqua', 'darkblue', 'aquamarine', 'mediumblue', 'azure', 'blue', 'beige', 'darkgreen', 'bisque', 'green', 'black', 'teal', 'blanchedalmond', 'darkcyan', 'blue', 'deepskyblue', 'blueviolet', 'darkturquoise', 'brown', 'mediumspringgreen', 'burlywood', 'lime', 'cadetblue', 'springgreen', 'chartreuse', 'aqua', 'chocolate', 'cyan', 'coral', 'midnightblue', 'cornflowerblue', 'dodgerblue', 'cornsilk', 'lightseagreen', 'crimson', 'forestgreen', 'cyan', 'seagreen', 'darkblue', 'darkslategray', 'darkcyan', 'limegreen', 'darkgoldenrod', 'mediumseagreen', 'darkgray', 'turquoise', 'darkgreen', 'royalblue', 'darkkhaki', 'steelblue', 'darkmagenta', 'darkslateblue', 'darkolivegreen', 'mediumturquoise', 'darkorange', 'indigo', 'darkorchid', 'darkolivegreen', 'darkred', 'cadetblue', 'darksalmon', 'cornflowerblue', 'darkseagreen', 'mediumaquamarine', 'darkslateblue', 'dimgray', 'darkslategray', 'slateblue', 'darkturquoise', 'olivedrab', 'darkviolet', 'slategray', 'deeppink', 'lightslategray', 'deepskyblue', 'mediumslateblue', 'dimgray', 'lawngreen', 'dodgerblue', 'chartreuse', 'firebrick', 'aquamarine', 'floralwhite', 'maroon', 'forestgreen', 'purple', 'fuchsia', 'olive', 'gainsboro', 'gray', 'ghostwhite', 'skyblue', 'gold', 'lightskyblue', 'goldenrod', 'blueviolet', 'gray', 'darkred', 'green', 'darkmagenta', 'greenyellow', 'saddlebrown', 'honeydew', 'darkseagreen', 'hotpink', 'lightgreen', 'indianred', 'mediumpurple', 'indigo', 'darkviolet', 'ivory', 'palegreen', 'khaki', 'darkorchid', 'lavender', 'yellowgreen', 'lavenderblush', 'sienna', 'lawngreen', 'brown', 'lemonchiffon', 'darkgray', 'lightblue', 'lightblue', 'lightcoral', 'greenyellow', 'lightcyan', 'lightsteelblue', 'lightgoldenrodyellow', 'powderblue', 'lightgreen', 'firebrick', 'lightgrey', 'darkgoldenrod', 'lightpink', 'mediumorchid', 'lightsalmon', 'rosybrown', 'lightseagreen', 'darkkhaki', 'lightskyblue', 'silver', 'lightslategray', 'mediumvioletred', 'lightsteelblue', 'indianred', 'lightyellow', 'peru', 'lime', 'chocolate', 'limegreen', 'tan', 'linen', 'lightgrey', 'magenta', 'thistle', 'maroon', 'orchid', 'mediumaquamarine', 'goldenrod', 'mediumblue', 'palevioletred', 'mediumorchid', 'crimson', 'mediumpurple', 'gainsboro', 'mediumseagreen', 'plum', 'mediumslateblue', 'burlywood', 'mediumspringgreen', 'lightcyan', 'mediumturquoise', 'lavender', 'mediumvioletred', 'darksalmon', 'midnightblue', 'violet', 'mintcream', 'palegoldenrod', 'mistyrose', 'lightcoral', 'moccasin', 'khaki', 'navajowhite', 'aliceblue', 'navy', 'honeydew', 'oldlace', 'azure', 'olive', 'wheat', 'olivedrab', 'beige', 'orange', 'whitesmoke', 'orangered', 'mintcream', 'orchid', 'ghostwhite', 'palegoldenrod', 'salmon', 'palegreen', 'sandybrown', 'palevioletred', 'antiquewhite', 'papayawhip', 'linen', 'peachpuff', 'lightgoldenrodyellow', 'peru', 'oldlace', 'pink', 'red', 'plum', 'fuchsia', 'powderblue', 'magenta', 'purple', 'deeppink', 'red', 'orangered', 'rosybrown', 'tomato', 'royalblue', 'hotpink', 'saddlebrown', 'coral', 'salmon', 'darkorange', 'sandybrown', 'lightsalmon', 'seagreen', 'orange', 'seashell', 'lightpink', 'sienna', 'pink', 'silver', 'gold', 'skyblue', 'peachpuff', 'slateblue', 'navajowhite', 'slategray', 'moccasin', 'snow', 'bisque', 'springgreen', 'mistyrose', 'steelblue', 'blanchedalmond', 'tan', 'papayawhip', 'teal', 'lavenderblush', 'thistle', 'seashell', 'tomato', 'cornsilk', 'turquoise', 'lemonchiffon', 'violet', 'floralwhite', 'wheat', 'snow', 'white', 'yellow', 'whitesmoke', 'lightyellow', 'yellow', 'ivory', 'yellowgreen', 'white'];

  Axe.Vector = (function() {
    Vector.prototype.x = 0;

    Vector.prototype.y = 0;

    function Vector(x, y, screen) {
      this.x = x != null ? x : null;
      this.y = y != null ? y : null;
      if (screen == null) {
        screen = false;
      }
      if (this.x == null) {
        this.x = 0;
      }
      if (this.y == null) {
        this.y = this.x;
      }
      if (screen) {
        this.x *= Axe.Game.instance.canvas.width;
        this.y *= Axe.Game.instance.canvas.height;
      }
    }

    Vector.prototype.set = function(x, y) {
      if (x == null) {
        x = null;
      }
      if (y == null) {
        y = null;
      }
      if (typeof x === "object" && x !== null) {
        this.x = x.x;
        return this.y = x.y;
      } else {
        if (x == null) {
          this.x = 0;
        } else {
          this.x = x;
        }
        if (y == null) {
          return this.y = this.x;
        } else {
          return this.y = y;
        }
      }
    };

    Vector.prototype._add = function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    };

    Vector.prototype.add = function(v) {
      if (typeof v === "object") {
        return new Axe.Vector(this.x + v.x, this.y + v.y);
      }
      if (typeof v === "number") {
        return new Axe.Vector(this.x + v, this.y + v);
      }
    };

    Vector.prototype._sub = function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    };

    Vector.prototype.sub = function(v) {
      if (typeof v === "object") {
        return new Axe.Vector(this.x - v.x, this.y - v.y);
      }
      if (typeof v === "number") {
        return new Axe.Vector(this.x - v, this.y - v);
      }
    };

    Vector.prototype._mul = function(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    };

    Vector.prototype.mul = function(v) {
      if (typeof v === "object") {
        return new Axe.Vector(this.x * v.x, this.y * v.y);
      }
      if (typeof v === "number") {
        return new Axe.Vector(this.x * v, this.y * v);
      }
    };

    Vector.prototype._div = function(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    };

    Vector.prototype.div = function(v) {
      if (typeof v === "object") {
        return new Axe.Vector(this.x / v.x, this.y / v.y);
      }
      if (typeof v === "number") {
        return new Axe.Vector(this.x / v, this.y / v);
      }
    };

    Vector.prototype.rotate = function(angle) {
      this.x *= Math.cos(angle);
      this.y *= Math.sin(angle);
      return this;
    };

    Vector.prototype.dot = function(v) {
      return this.x * v.x + this.y * v.y;
    };

    Vector.prototype.cross = function(v) {
      return this.x * v.y - this.y * v.x;
    };

    Vector.prototype.normalize = function() {
      var l;
      l = this.length();
      return new Axe.Vector(this.x / l, this.y / l);
    };

    Vector.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    Vector.prototype.distance = function(v) {
      var x, y;
      x = this.x - v.x;
      y = this.y - v.y;
      return Math.sqrt(x * x + y * y);
    };

    Vector.prototype.distance2 = function(v) {
      var x, y;
      x = this.x - v.x;
      y = this.y - v.y;
      return x * x + y * y;
    };

    return Vector;

  })();

  window.Vector = Axe.Vector;

  Axe.Class = (function() {
    Class.constructors = {};

    Class.include = function(o, callback) {
      var k, v, _ref;
      _ref = o.prototype;
      for (k in _ref) {
        v = _ref[k];
        if (k !== 'name' && k !== 'constructor') {
          this.prototype[k] = v;
        }
      }
      if (o.constructor && o.name) {
        this.constructors[o.name] = o.constructor;
      }
      if (o.components) {
        o.components.forEach((function(_this) {
          return function(c) {
            return _this.component(c.component, c.callback);
          };
        })(this));
      }
      if (callback) {
        return as(this.prototype, callback);
      }
    };

    Class.component = function(o, callback) {
      this.components = this.components || [];
      return this.components.push({
        component: o,
        callback: callback
      });
    };

    Class.property = function(name, value) {
      if (value == null) {
        value = null;
      }
      return this.prototype[name] = value;
    };

    Class.prototype.property = function(name, value) {
      if (value == null) {
        value = null;
      }
      return this[name] = value;
    };

    function Class(args) {
      var c, k, _i, _len, _ref, _ref1;
      _ref = this.constructor.constructors;
      for (k in _ref) {
        c = _ref[k];
        c.call(this);
      }
      if (this.constructor.components) {
        _ref1 = this.constructor.components;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          this[c.component.label] = new c.component(args);
          this[c.component.label].parent = this;
          if (c.callback) {
            as(this[c.component.label], c.callback);
          }
        }
      }
      if (this.init) {
        this.init();
      }
    }

    return Class;

  })();

  Axe.Component = (function(_super) {
    __extends(Component, _super);

    Component.label = function(label) {
      this.label = label;
    };

    Component.prototype.id = null;

    function Component(state) {
      this.state = state;
      Component.__super__.constructor.call(this, this.state);
      this.state.components.push(this);
      this.id = this.state.components.length - 1;
    }

    Component.prototype.destroy = function() {
      var c, _i, _len, _ref;
      if (this.constructor.components) {
        _ref = this.constructor.components;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          this[c.component.label].destroy();
        }
      }
      if (typeof this.destructor === "function") {
        this.destructor();
      }
      delete this.state.components[this.id];
      return this.state.components.slice(this.id, 1);
    };

    return Component;

  })(Axe.Class);

  Axe.State = (function(_super) {
    __extends(State, _super);

    function State() {
      return State.__super__.constructor.apply(this, arguments);
    }

    State.prototype.paused = false;

    State.prototype.components = [];

    State.prototype.dispatch = function(event, args) {
      return this.components.forEach(function(o) {
        if ((o != null) && typeof o[event] === "function") {
          return o[event](args);
        }
      });
    };

    State.prototype.enter = function() {};

    State.prototype.exit = function() {};

    State.prototype.pause = function() {};

    State.prototype.resume = function() {};

    State.prototype.resize = function() {};

    State.prototype.update = function() {
      return this.dispatch('update');
    };

    return State;

  })(Axe.Class);

  Axe.StateMachine = (function(_super) {
    __extends(StateMachine, _super);

    function StateMachine() {
      return StateMachine.__super__.constructor.apply(this, arguments);
    }

    StateMachine.states = [];

    StateMachine.prototype.start = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.enter.apply(this, args);
      if (typeof this.onStart === "function") {
        return this.onStart.apply(this, args);
      }
    };

    StateMachine.prototype.update = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.states.top() && !this.states.top().paused) {
        return (_ref = this.states.top()).update.apply(_ref, args);
      }
    };

    StateMachine.prototype.end = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (typeof this.onEnd === "function") {
        this.onEnd.apply(this, args);
      }
      if (this.states.top()) {
        (_ref = this.states.top()).exit.apply(_ref, args);
      }
      this.states.filter(function(s) {
        return s.paused;
      }).forEach(function(s) {
        if (s) {
          return s.exit.apply(s, args);
        }
      });
      return this.states.splice(0, this.states.length);
    };

    StateMachine.prototype.enter = function() {
      var args, _ref, _ref1;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.states.top()) {
        (_ref = this.states.top()).enter.apply(_ref, args);
        return (_ref1 = this.states.top()).resize.apply(_ref1, args);
      }
    };

    StateMachine.prototype.next = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.states.top()) {
        (_ref = this.states.pop()).exit.apply(_ref, args);
      }
      return this.enter.apply(this, args);
    };

    StateMachine.prototype.pause = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.states.top()) {
        this.states.top().paused = true;
        return (_ref = this.states.top()).pause.apply(_ref, args);
      }
    };

    StateMachine.prototype.resume = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.states.top()) {
        this.states.top().paused = false;
        return (_ref = this.states.top()).resume.apply(_ref, args);
      }
    };

    StateMachine.prototype.resize = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.states.top()) {
        (_ref = this.states.top()).resize.apply(_ref, args);
      }
      return this.states.filter(function(s) {
        return s.paused;
      }).forEach(function(s) {
        if (s) {
          return s.resize.apply(s, args);
        }
      });
    };

    return StateMachine;

  })(Axe.Class);

  Axe.Game = (function(_super) {
    __extends(Game, _super);

    Game.instance = null;

    Game.prototype.states = [];

    function Game(options, callback) {
      if (typeof options === "string") {
        options = JSON.parse(options);
      }
      this.name = options.name;
      this.constructor.instance = this;
      if (typeof callback === "function") {
        callback.call(this);
      }
    }

    Game.prototype.setup = function(callback) {
      this.canvas = document.getElementById(this.name);
      this.context = this.canvas.getContext("2d");
      this.buffer = document.createElement('canvas');
      this.bufferContext = this.buffer.getContext('2d');
      window.onresize = (function(_this) {
        return function() {
          var previousSize;
          previousSize = new Vector(_this.canvas.width, _this.canvas.height);
          _this.resize(previousSize);
          Axe.StateMachine.prototype.resize.call(_this, previousSize);
          _this.buffer.width = _this.canvas.width;
          _this.buffer.height = _this.canvas.height;
          _this.context.mozImageSmoothingEnabled = false;
          _this.context.webkit1ImageSmoothingEnabled = false;
          return _this.context.imageSmoothingEnabled = false;
        };
      })(this);
      return as(this, callback);
    };

    Game.prototype.start = function() {
      window.onresize();
      Axe.StateMachine.prototype.start.call(this);
      return this.loop();
    };

    Game.prototype.resize = function() {};

    Game.prototype.flip = function() {
      return this.context.drawImage(this.buffer, 0, 0);
    };

    Game.prototype.swapCanvas = function() {
      var _ref;
      return _ref = [this.buffer, this.bufferContext, this.canvas, this.context], this.canvas = _ref[0], this.context = _ref[1], this.buffer = _ref[2], this.bufferContext = _ref[3], _ref;
    };

    Game.prototype.clear = function() {
      return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Game.prototype.loop = function() {
      this.clear();
      this.swapCanvas();
      this.clear();
      this.update();
      this.swapCanvas();
      this.flip();
      return requestAnimationFrame(bind(this, this.loop));
    };

    return Game;

  })(Axe.StateMachine);

  Axe.Orientation = (function(_super) {
    __extends(Orientation, _super);

    Orientation.label('orientation');

    function Orientation(state) {
      this.state = state;
      Orientation.__super__.constructor.call(this, this.state);
      window.addEventListener('deviceorientation', this.onMotion, false);
    }

    Orientation.prototype.destructor = function() {
      return window.removeEventListener('deviceorientation', this.onMotion, false);
    };

    Orientation.prototype.onMotion = function(acceleration) {};

    return Orientation;

  })(Axe.Component);

  Axe.Keyboard = (function(_super) {
    __extends(Keyboard, _super);

    Keyboard.label('keyboard');

    Keyboard.keys = {};

    function Keyboard(state) {
      this.state = state;
      Keyboard.__super__.constructor.call(this, this.state);
      this.__onKeyDown = bind(this, function(e) {
        var down;
        down = Axe.Keyboard.keys[e.keyCode];
        Axe.Keyboard.keys[e.keyCode] = true;
        if (!down) {
          return this.onKeyDown(e.keyCode);
        }
      });
      this.__onKeyUp = bind(this, function(e) {
        var up;
        up = !Axe.Keyboard.keys[e.keyCode];
        Axe.Keyboard.keys[e.keyCode] = false;
        if (!up) {
          return this.onKeyUp(e.keyCode);
        }
      });
      window.addEventListener('keydown', this.__onKeyDown, false);
      window.addEventListener('keyup', this.__onKeyUp, false);
    }

    Keyboard.prototype.destructor = function() {
      window.removeEventListener('keydown', this.__onKeyDown, false);
      return window.removeEventListener('keyup', this.__onKeyUp, false);
    };

    Keyboard.prototype.onKeyDown = function(key) {};

    Keyboard.prototype.onKeyUp = function(key) {};

    Keyboard.prototype.keyDown = function(key) {
      return Axe.Keyboard.keys[key];
    };

    Keyboard.prototype.keyUp = function(key) {
      return !Axe.Keyboard.keys[key];
    };

    return Keyboard;

  })(Axe.Component);

  Axe.Renderable = (function(_super) {
    __extends(Renderable, _super);

    Renderable.label('render');

    function Renderable(state) {
      this.state = state;
      Renderable.__super__.constructor.call(this, this.state);
    }

    Renderable.prototype.render = function() {};

    Renderable.prototype.update = function() {
      this.canvas = Axe.Game.instance.canvas;
      this.context = Axe.Game.instance.context;
      if (typeof this.render === "function") {
        return this.render();
      }
    };

    return Renderable;

  })(Axe.Component);

  window.random = function(x, y) {
    if ((x == null) && (y == null)) {
      return Math.random();
    }
    if (y == null) {
      return Math.random() * x;
    }
    return Math.random() * (y - x) + x;
  };

  Array.prototype.pick = function() {
    return this[Math.floor(random(0, this.length))];
  };

  Array.prototype.top = function() {
    return this[this.length - 1];
  };

  Math.lerp = function(a, b, f) {
    return a + f * (b - a);
  };

  window.as = function(object, callback) {
    return callback.call(object);
  };

  window.bind = function(object, callback) {
    return callback.bind(object);
  };

  window.timeout = function(time, callback) {
    return window.setTimeout(callback, time);
  };

  window.interval = function(time, callback) {
    return window.setInterval(callback, time);
  };

  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, e) {
    return window.setTimeout(callback, 1000 / 60);
  };

}).call(this);
