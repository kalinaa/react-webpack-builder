'use strict';

import { Route } from 'react-router';

export default function PageRoute() {
  return (
    <Route path={ this.props.path } getComponent={ (location, callback) => {
      require.ensure([], function (require) {
        callback(null, require('NotFound').default);
      });
    }}/>)
}