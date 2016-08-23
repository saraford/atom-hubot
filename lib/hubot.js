'use babel';

import HubotView from './hubot-view';
import { CompositeDisposable } from 'atom';

export default {

  hubotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hubotView = new HubotView(state.hubotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
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
      var editor = atom.workspace.getActiveTextEditor();
      console.log("editor: " + editor);
      var words = editor.getText().split(/\s+/).length;
      console.log("words: " + words);
      this.hubotView.setCount(words);
      this.modalPanel.show();
    }

    return isVisible;
  }

};
