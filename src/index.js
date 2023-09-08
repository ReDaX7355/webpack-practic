import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  let myImg = new Image();
  myImg.src = Icon;

  element.appendChild(myImg);

  return element;
}

document.body.appendChild(component());
