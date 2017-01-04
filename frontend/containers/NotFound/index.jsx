import { Link } from 'react-router'

import './style.css'

export default function NotFound() {
  return (
    <div className='container'>
      And this page DIY :) <Link to='/' className='goback-btn'>Go back</Link>?
    </div>
  )
}