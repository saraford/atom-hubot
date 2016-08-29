module.exports = (robot) ->
  robot.respond /cats$/i, (msg) ->
    msg.send "nope, i love dogs"
