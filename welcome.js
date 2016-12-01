'use strict';

import test from './testexport';

export default message => {
  if(NODE_ENV == 'development') {
    alert('development');
  }
  alert(`Welcome ${message}`);
  test('oiuhkjads')
};