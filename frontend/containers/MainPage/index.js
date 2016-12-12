'use strict';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActions from '../../actions/userActions';
import Test2 from 'test2';

@connect(
  state => ({
    user: state.data.user,
    // page: state.mainPage
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  })
)

export default class MainPage extends React.Component {
  componentWillMount() {
    this.props.userActions.loadUserContent();
  }

  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  render() {
    if (this.props === undefined) return <span> Loading </span>;

    return (
      <div id='main-page' className='page-root'>
        <div className='wrapper'>
          <main className='content'>
            Привет {this.props.user.nickname}!
            <Test2 />
          </main>
        </div>
      </div>
    );
  }
}