import React from 'react'
import Main from './components/Main'

const App = () => {
  return (
    <div className='bg-slate-900'>
      <Main />
    </div>
  )
}

export default React.memo(App)