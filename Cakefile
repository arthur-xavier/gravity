{spawn, exec} = require 'child_process'

coffee = require 'coffee-script'
uglify = require 'uglify-js'
watchr = require 'watchr'
fs     = require 'fs'

read = (dir, file) ->
  fs.readFileSync("#{dir}/#{file}").toString().replace /require\s+[\'\"](.*)[\'\"]/gi, (_, name) ->
    read dir, "#{name}.coffee"

build = (file, dir, options = {}) ->
  stream = fs.createWriteStream file

  stream.once 'open', ->
    stream.write "window.MOBILE = #{options.mobile or "false"};\n"
    js = coffee.compile(read dir, "main.coffee")
    stream.write if options.minify then uglify.minify(js, fromString: true).code else js
    stream.end()

option '-m', '--minify', 'minify the compiled javascript code'
option '-p', '--phonegap', 'build for mobile platforms using phonegap'

task 'build', 'build files into minified javascript', (options) ->
  build 'js/axe.js', 'src/axe', options.minify
  build 'js/gravity.js', 'src/gravity', options.minify
  console.log "done :)"

task 'watch', 'watch the files for change', (options) ->
  watchr.watch 
    paths: ['src/axe', 'src/gravity']
    interval: 1000
    listener: (action, path, currentStat, previousStat) ->
      console.log "- file #{action}d: #{path} - #{new Date().toUTCString()}"
      if path.match 'src/axe'
        build 'js/axe.js', 'src/axe', options
        console.log "+ building js/axe.js..."
      else if path.match 'src/gravity'
        build 'js/gravity.js', 'src/gravity', options
        console.log "+ building js/gravity.js..."


    next: ->
      console.log 'watching...'
