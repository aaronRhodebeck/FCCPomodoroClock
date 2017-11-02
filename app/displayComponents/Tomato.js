import React from 'react';
import TomatoSVG from '../assets/tomato-optimized.svg';

const Tomato = () => (
  <TomatoSVG
    style={{
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      left: 0,
      maxHeight: '100%',
    }}
    id="tomato"
  />
);

export default Tomato;
