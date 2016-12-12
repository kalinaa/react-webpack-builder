"use strict";
import { Link } from 'react-router'

export default function Test2() {
  return(
    <div>
      Это второй внутренний компонента <Link to='/testNotFound'>тест</Link>
    </div>
  )
}