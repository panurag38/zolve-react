import React from 'react';
import { withRouter } from 'react-router';

const Header = (props) => {
  const { history: { push } } = props;
  const onClickItem = (path) => {
    if (!path) return;
    push(path);
  }
  return (
    <header>
      <div className="header">
        <span className="header-item" onClick={() => onClickItem('/')}>Home</span>
        <span className="header-item" onClick={() => onClickItem('/results?q=horizontal-bar')}>Results</span>
        <span className="header-item" onClick={() => onClickItem('/upload')}>Upload</span>
      </div>
    </header>
  );
}

export default withRouter(Header);