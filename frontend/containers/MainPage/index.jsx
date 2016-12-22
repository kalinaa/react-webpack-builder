'use strict';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'normalize.css'
import './style.scss'

import * as userActions from '../../actions/userActions';
import * as pageActions from '../../actions/mainPageActions';
import Preloader from 'Preloader';
import JustStartIt from 'JustStartIt';
import AnimationBg from 'AnimationBg';
import EditUserPopup from 'EditUserPopup';

@connect(
  state => ({
    app: state.app,
    user: state.data.user,
    page: state.mainPage
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch),
  })
)

export default class MainPage extends React.Component {
  componentWillMount() {
    this.props.userActions.loadUser();
  }

  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  render() {
    if (!this.props || this.props.app.fetching) return <Preloader />;

    return (
      <div id='main-page' className='page-root'>
        <div className='wrapper'>
          <main className='content'>
            Hello, {this.props.user.nickname}!<br/>
            <span className="who-are-you">You're not {this.props.user.nickname}?</span>
            <button type="button"
                    className="change-name"
                    onClick={this.props.pageActions.toggleEditUserPopup}>Change name
            </button>
            <h2>All inclusive!</h2>
            <ul className="tech">
              <li className="tech__item">Free React</li>
              <li className="tech__item">Free webpack-builder</li>
              <li className="tech__item">Free hot-reload</li>
              <li className="tech__item">Free node-express server</li>
              <li className="tech__item">Free docker-compose</li>
              <li className="tech__item">And much more for free:)</li>
            </ul>
            <JustStartIt />
          </main>
          <AnimationBg animationDuration={73000}/>
        </div>
        <EditUserPopup
          user={this.props.user}
          editUser={this.props.userActions.editUser}
          togglePopup={this.props.pageActions.toggleEditUserPopup}
          visible={this.props.page.editUserPopup.visible}/>
      </div>
    );
  }
}