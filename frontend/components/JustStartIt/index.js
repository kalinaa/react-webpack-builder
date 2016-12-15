"use strict";
import { Link } from 'react-router'

import './style.css'

export default function JustStartIt() {
  return(
    <button className="start-btn">
      <Link to='/testNotFound'>Just Start It!</Link>
    </button>
  )
}