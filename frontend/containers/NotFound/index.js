import { Link } from 'react-router'
import Test from 'test';

export default function NotFound() {
  return (
    <div className='container'>
      Страница не найдена :(. Вернуться на <Link to='/'>главную</Link>?
      <Test />
    </div>
  )
};

