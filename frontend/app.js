"use strict";

let moduleName = location.pathname.slice(1);

let handler;

try {
  handler = require('bundle!./pages/' + moduleName + '.js')
} catch(e) {
  console.log('Для этой страницы нет модулей');
}

if(handler) {
  handler((jsrouter)=>{
    jsrouter();
  });
}

document.getElementById('loginButton').onclick = function () {
// require.ensure - is webpack function
  require.ensure([], function (require) {
    let login = require('./login');

    login();
  }, 'auth');
};
