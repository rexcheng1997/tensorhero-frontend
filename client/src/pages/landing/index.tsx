import './style.scss';

import React, { FC } from 'react';
import ReactDom from 'react-dom';
import Navbar from 'components/Navbar';
import HomeSection from './HomeSection';

const LandingPage: FC = () => (<>
  <Navbar base='.'/>
  <HomeSection/>
</>);

ReactDom.render(<LandingPage/>, document.getElementById('root'));
