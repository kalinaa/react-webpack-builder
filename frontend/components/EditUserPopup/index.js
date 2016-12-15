"use strict";

import './style.css'

export default function EditUserPopup(props) {
  let
    user = props.user,
    userActions = props.userActions;

  function changeNick(e) {
    let newNickname = e.target.value;

    if (user.nickname != newNickname) {
      let data = {
        userId: user.id,
        nickname: newNickname
      };
      userActions.editUser(data);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={`popup ${props.visible ? 'popup_visible' : ''}`}>
      <form id='editUser' onSubmit={onSubmit}>
        <input type='text' className='popup_input' defaultValue={user.nickname} onBlur={changeNick}/>
      </form>
    </div>
  )
}