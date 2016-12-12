"use strict";
import { Link } from 'react-router'

export default function Test2() {
  return(
    <div>
      Это второй внутренний компонент <Link to='/testNotFound'>тест</Link>
    </div>
  )
}