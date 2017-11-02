import React from 'react';
import Tomato from '../displayComponents/Tomato';

const Main = () => (
  <div
    style={{
      position: 'absolute',
      height: '80vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      top: '10vh',
    }}
  >
    <Tomato />
  </div>
);
export default Main;
