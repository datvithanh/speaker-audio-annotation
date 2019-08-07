import React from 'react'
import LayoutStyle from './index.style';
import Navbar from './Navbar/Navbar';

const index = ({children}) => {
  return (
    <LayoutStyle>
      <div className="navbar"><Navbar /></div>
      <div className="content">{children}</div>
    </LayoutStyle>
  )
}

export default index
