'use babel';

var robot = undefined;
var Hubot = require('hubot');
const TextMessage = Hubot.TextMessage;
var user = undefined;

var sendRequest = function() {

  var hubotRequest = document.getElementById("hubot-input").value;
  console.log("sending request: " + hubotRequest);
  robot.receive(new TextMessage(user, hubotRequest, 'messageId'));
//  outputChannel.appendLine(">" + hubotRequest);

};

export default class HubotView {

  constructor(serializedState, myrobot) {

    var rootDiv = document.createElement('div');

    var howtotrain = document.createElement('h1');
    howtotrain.innerHTML = "How to train your hubot";
    howtotrain.type = "text";

    var hubot_output = document.createElement('div');
    hubot_output.id = 'hubot-output';

    var bottom_section = document.createElement('div');
    bottom_section.id = 'bottom-section';

    var hint = document.createElement('div');
    hint.id = 'hint';
    hint.innerHTML = 'hubot help';

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

    input_area.appendChild(hubot_input);
    input_area.appendChild(send_button);

    bottom_section.appendChild(hint);
    bottom_section.appendChild(input_area);

    rootDiv.appendChild(howtotrain);
    rootDiv.appendChild(hubot_output);
    rootDiv.appendChild(bottom_section);

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

  setRobot(myrobot, myuser) {
    robot = myrobot;
    user = myuser;
  }

}
