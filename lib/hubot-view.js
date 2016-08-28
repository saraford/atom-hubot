'use babel';

var robot = undefined;
var Hubot = require('hubot');
var user = undefined;
var sendRequest = undefined;
var $ = require('jquery');
var controller = undefined;
var isDragging = false;
var isMouseDown = false;
var mouseDownX = 0;

var sendRequest = function() {
  controller.sendRequest();
}

var uploadScripts = function() {
  controller.uploadScripts();
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

  // <div id="script-error">there's a syntax error with the script</div>
    var script_error = document.createElement('div');
    script_error.id = 'script-error';
    script_error.innerHTML = "there's a syntax error with the script";
//    script_error.style.visibility = "hidden";

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
    script_section.innerHTML = 'Hubot is watching scripts at ';

    var a = document.createElement('a');
    a.id = "scripts-link";
    a.innerHTML = "google.com"
    script_section.appendChild(a);

    // var upload_button = document.createElement("input");
    // upload_button.type = "button";
    // upload_button.value = "Refresh scripts";
    // upload_button.id = "upload-button";
    // upload_button.addEventListener("click", uploadScripts);

    input_area.appendChild(hubot_input);
    input_area.appendChild(send_button);

    bottom_section.appendChild(script_error);
    bottom_section.appendChild(script_section);
    bottom_section.appendChild(hint);
    bottom_section.appendChild(input_area);
//    bottom_section.appendChild(upload_button);

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

  setCount(count) {
    var displayText = `There are ${count} words.`;
    console.log("displayText: " + displayText);
//    this.element.innerHTML = displayText ;
  }

  setController(myController) {
    controller = myController;
  }

  detectEnterPress() {
    $('#hubot-input').keyup(function (e) {
      if (e.keyCode == 13) {
        controller.sendRequest();
      }
    });

    // $('#resize-handle').mousedown(function(event) {
    //     isDragging = false;
    //     mouseDownX = event.pageX;
    //     isMouseDown = true;
    //     console.log("mouseDown mouseDownX: " + mouseDownX);
    // })
    // $('#resize-handle').mousemove(function(event) {
    //     if (isMouseDown) {
    //       isDragging = true;
    //
    //       var diff = mouseDownX - event.pageX;
    //       var width = $('#root').width();
    //
    //       $('#root').width(width + diff);
    //       mouseDownX = event.pageX;
    //     }
    //  })
    // $('#resize-handle').mouseup(function() {
    //     var wasDragging = isDragging;
    //     isDragging = false;
    //     isMouseDown = false;
    //     console.log("mouseUp isDragging: " + isDragging);
    //     if (!wasDragging) {
    //       console.log("was not dragging - do something?");
    //     }
    // });
  }

}
