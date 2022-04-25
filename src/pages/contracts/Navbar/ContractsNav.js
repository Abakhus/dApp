import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './ContractsNav.css'


export default props => {
  const showLab = async () => {
    return (
      <Menu>
         <a onClick={ showLab } className="menu-item" href="/pages/Laboratories">
        Report
      </a>
      <a onClick={ showLab } className="menu-item" href="/pages/Laboratories">
        Utility Token
      </a>
      </Menu>
    )
  }
  return (
    <Menu>
      <a className="menu-item" href="/pages/Laboratories">
        Laboratories
      </a>
      <a className="menu-item" href="/pages/DataScience">
        Data Science
      </a>
    </Menu>
  );
};