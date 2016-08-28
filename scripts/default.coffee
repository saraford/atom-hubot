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

  robot.hear /I like pie/i, (res) ->
    res.emote "makes some pie"

  robot.respond /HELP$/i, (msg) ->
    msg.send "Here's what you can ask me:\n
      hubot ping\n
      hubot open the (type of) doors\n
      hubot pug me\n
      hubot pug bomb <number>\n
      hubot how many pugs are there\n
      hubot the rules\n
      hubot the rules apple\n
      \n
      Here's what you can mention\n
      \"I like pie\"\n
      \n
      You can also write and upload your own scripts!"
