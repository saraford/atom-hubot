'use babel';

export default class HubotView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('input', value = "The Hubot Package is Alive");
    this.element.classList.add('hubot');

    // Create message element
    // const message = document.createElement('div');
    // message.textContent = 'The Hubot package is Alive! It\'s ALIVE!';
    // message.classList.add('message');

//    this.element.innerHTML = 'The Hubot package is ALIVE!';

//    this.element.appendChild(message);
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

}
