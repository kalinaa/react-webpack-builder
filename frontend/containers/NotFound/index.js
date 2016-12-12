'use strict';

import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className='container'>
      Страница не найдена :(. Вернуться на <Link to='/'>главную</Link>?
    </div>
  )
};

