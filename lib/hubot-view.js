'use babel';

var robot = undefined;
var Hubot = require('hubot');
var user = undefined;
var sendRequest = undefined;
var changeScript = undefined;
var $ = require('jquery');
var controller = undefined;
var isDragging = false;
var isMouseDown = false;
var mouseDownX = 0;

var sendRequest = function() {
  controller.sendRequest();
}

var changeScript = function() {
  controller.changeScript();
}

var uploadScripts = function() {
  controller.uploadScripts();
}

var resizeStarted = function(event) {
  // the original offset needed to figure out where resize began
  mouseDownX = event.pageX;

  $(document).on('mousemove', resizeTreeView);
  $(document).on('mouseup', resizeStopped);
}

var resizeStopped = function() {
  $(document).off('mousemove', resizeTreeView)
  $(document).off('mouseup', resizeStopped)
}

var resizeTreeView = function({pageX, which}) {

  if (which != 1) {
    resizeStopped();
  }

  var diff = mouseDownX - pageX;
  var currentWidth = $('#root').width();
  var newWidth = currentWidth + diff;

  $('#root').width(newWidth);

  // need to set where the new mousedown offset is
  // otherwise resize will fly off the screen
  // from over-counting the intial mouseDown location
  mouseDownX = pageX;
}

export default class HubotView {

  constructor(serializedState) {

    var rootDiv = document.createElement('div');
    rootDiv.id = 'root';

    var mainWindowDiv = document.createElement('div');
    mainWindowDiv.id = 'mainWindow';

    var resizeHandle = document.createElement('div');
    resizeHandle.id = 'resize-handle';

    var howtotrain = document.createElement('h1');
    howtotrain.innerHTML = "How to train your hubot";
    howtotrain.type = "text";

    var hubot_output = document.createElement('div');
    hubot_output.id = 'hubot-output';

    var bottom_section = document.createElement('div');
    bottom_section.id = 'bottom-section';

    var script_error = document.createElement('div');
    script_error.id = 'script-error';
    script_error.innerHTML = "there's a syntax error with the script";

    var hint = document.createElement('div');
    hint.id = 'hint';
    hint.innerHTML = 'need a hint? try: hubot help';

    var input_area = document.createElement('div');
    input_area.id = 'input-area';

    hubot_input = document.createElement("input");
    hubot_input.type = "text";
    hubot_input.id = "hubot-input";
    hubot_input.classList.add('native-key-bindings');
    hubot_input.setAttribute("tabIndex", "-1");
    hubot_input.placeholder = "type your message";

    var send_button = document.createElement("input");
    send_button.type = "button";
    send_button.value = "Send";
    send_button.id = "send-button";
    send_button.addEventListener("click", sendRequest);

    var script_section = document.createElement('div');
    script_section.id = 'script-location';
    script_section.innerHTML = 'Hubot is watching for changes to script file at ';

    var a = document.createElement('a');
    a.id = "scripts-link";
    a.innerHTML = "file not found";
    a.addEventListener("click", changeScript);
    script_section.appendChild(a);

    input_area.appendChild(hubot_input);
    input_area.appendChild(send_button);

    bottom_section.appendChild(script_error);
    bottom_section.appendChild(script_section);
    bottom_section.appendChild(hint);
    bottom_section.appendChild(input_area);

    mainWindowDiv.appendChild(howtotrain);
    mainWindowDiv.appendChild(hubot_output);
    mainWindowDiv.appendChild(bottom_section);

    rootDiv.appendChild(mainWindowDiv);
    rootDiv.appendChild(resizeHandle);

    this.element = rootDiv;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setController(myController) {
    controller = myController;
  }

  detectEnterPress() {
    $('#hubot-input').keyup(function (e) {
      if (e.keyCode === 13) {
        controller.sendRequest();
      } else if (e.keyCode === 38) {
        // up arrow
        controller.getPrevCommand();
      } else if (e.keyCode === 40) {
        // down arrow
        controller.getNextCommand();
      }
    });

    $('#resize-handle').mousedown(function(event) {
      resizeStarted(event);
    });
  }

}
