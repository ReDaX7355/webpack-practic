import _ from 'lodash';
import printMe from './print.js';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');

  button.innerHTML = 'Click me';
  button.onclick = printMe;

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(button);

  return element;
}

document.body.appendChild(component());
