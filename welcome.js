'use strict';

export default message => {
  if(NODE_ENV == 'development') {
    console.log('development');
  }
  alert(`Welcome ${message}`);
};