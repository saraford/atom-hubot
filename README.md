# Atom-Hubot

Test out your hubot scripts within Atom!

![Atom Hubot Package demo](https://cloud.githubusercontent.com/assets/11529908/18057791/4b381000-6dc6-11e6-9a82-154918e5ec3b.gif)

# What's new 

### v0.3.0 

1. Fixed [#5 - Hubot crashes Atom for certain syntax errors](https://github.com/saraford/atom-hubot/issues/5)
2. Removed ability to change which script file hubot watches. See [#7 - Allow user to specify which file Hubot should watch](Allow user to specify which file Hubot should watch)


### v0.2.1

1. Fixed [#1 - Up / Down arrows should cycle through command history](https://github.com/saraford/atom-hubot/issues/1)
2. Fixed [#2 - Ability to resize the hubot pane](https://github.com/saraford/atom-hubot/issues/2)
3. Fixed [#3 - Log Hubot's built-in @Logger when requested](https://github.com/saraford/atom-hubot/issues/3)
4. Fixed [#4 - Run hubot commands using '.'](https://github.com/saraford/atom-hubot/issues/4)

# Install

### From Atom 

1. Go to Atom - Preferences - Install Packages 
2. Search for the `atomhubot` project. No dash.
3. Install!

### From this repo 

1. clone this repo into your .atom/packages directory
2. npm install

## Usage

From atom, use the default keyboard shortcut Ctrl-Option-O or Packages - Hubot - Toggle

## Misc

- This uses the hubot-electron adapter located at https://github.com/saraford/hubot-electron
- By default, the package is watching for a file save to play.coffee. I included a test/test.coffee file to test changing the watched file.
