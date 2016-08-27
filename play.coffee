module.exports = (robot) ->
  robot.respond /thundercats$/i, (msg) ->
    msg.send "Voltron is better"

  robot.respond /tell me a joke$/i, (msg) ->
    msg.send "a 3-legged dog walks into a bar and says I'm looking for the man who shot my paw!"
