'use babel';

import HubotView from './hubot-view';
import { CompositeDisposable } from 'atom';

require('coffee-script/register');
var Hubot = require('hubot');
var Path = require('path');
var robot = undefined;
var user = undefined;
var scriptsPath = Path.resolve(__dirname, "../scripts");
var hubotOutputWindow = undefined;

var loadScripts = function() {
    console.log("Scripts loading");
    console.log("__dirname " + scriptsPath);
    robot.load(scriptsPath);
};

const updateWindowWithHubotMessage = (response) => {

  if (typeof isEmote === 'undefined') { isEmote = false; }

  response = response.trim();

  // only supporting single media responses right now
  if (response.endsWith(".jpg") || response.endsWith(".gif") || response.endsWith(".png")) {
    hubotOutputWindow.append("<div class='output-row'><div class='hubot-avatar'><img src='hubot.png'/></div><div class='hubot-message'><img src='" + response + "'/></div></div>");
  } else if (response.includes('Shell:')) {
    response = response.replace("Shell:", "@octocat:");
    hubotOutputWindow.append("<div class='output-row'><div class='hubot-avatar'><img src='hubot.png'/></div><div class='hubot-message'>" + response + "</div></div>");
  }
  else {
    if (isEmote) {
          hubotOutputWindow.append("<div class='output-row'><div class='hubot-avatar'><img src='hubot.png'/></div><div class='hubot-message'><i>" + response + "</i></div></div>");
    } else {
      hubotOutputWindow.append("<div class='output-row'><div class='hubot-avatar'><img src='hubot.png'/></div><div class='hubot-message'>" + response + "</div></div>");
    }
  }

  scrollDown();
}

export default {

  hubotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hubotView = new HubotView(state.hubotViewState);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.hubotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hubot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hubotView.destroy();
  },

  serialize() {
    return {
      hubotViewState: this.hubotView.serialize()
    };
  },

  toggle() {
    console.log('Hubot was toggled again!');
    var isVisible = this.modalPanel.isVisible();

    if (isVisible) {
      this.modalPanel.hide();
    } else {
      this.modalPanel.show();

      try {

          robot = Hubot.loadBot(undefined, "sample", false, "Hubot", false);
          robot.adapter.wireUpResponses(updateWindowWithHubotMessage);
          user = robot.brain.userForId(1, 'electron', 'Shell');
          loadScripts();
          this.hubotView.setRobot(robot, user);
          console.log('hubot loaded');

          // wire up the buttons
          hubotOutputWindow = document.getElementById('hubot-output');


      } catch(ex) {
          console.error("Error trying to initialize hubot: " + ex);
      }
    }

    return isVisible;
  }

};
