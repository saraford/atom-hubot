module.exports = (robot) ->
  robot.respond /PING$/i, (msg) ->
    msg.send "PONG"

  robot.respond /open the (.*) doors/i, (res) ->
    doorType = res.match[1]
    console.log "doorType: #{doorType}"
    if doorType is "pod bay"
      res.reply "I'm afraid I can't let you do that."
    else
      res.reply "Opening #{doorType} doors"