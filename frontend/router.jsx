'use strict';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MainPage from 'MainPage'

class AppRouter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/'>
          <IndexRoute component={ MainPage }/>
          {/*<Route path='/:id' component={ UserPage }/>*/}
        </Route>
        <Route path='*' getComponent={ (location, callback) => {
          require.ensure([], function (require) {
            callback(null, require('./containers/NotFound').default);
          });
        }}/>
      </Router>
    );
  }
}

export default AppRouter;