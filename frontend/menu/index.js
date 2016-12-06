'use strict';

import './style.css';

import template from './menu.njk';

export default class Menu {
  constructor(options) {
    this.elem = document.createElement('div');
    this.elem.className = 'menu';

    this.elem.innerHTML = template.render(options);

    this.elem.querySelector('.title').onclick = () => {
      this.elem.classList.toggle('open');
    };
  }
}