import './style.scss';

import React, { FC } from 'react';
import ReactDom from 'react-dom';
import Navbar from 'components/Navbar';

const TechnicalStuffPage: FC = () => {
  return (<>
    <Navbar base='.'/>
    <header className='container home-background center'>
      <div className='content-wrapper flex-col align-center'>
        <h1 className='banner-text'>What is Tensor Hero?</h1>
        <p className='banner-text'>
          Tensor Hero is a web-based <em>Machine-Learning empowered</em>
          &nbsp;charting tool that auto-generates playable charts for Clone Hero
          &nbsp;(one sentence abt the community and support chart-sharing).
        </p>
      </div>
    </header>
    <section id='part-1' className='container'>
      <h1>Part I</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;
        Sit vivamus proin urna, neque neque vitae at pretium.&nbsp;
        Orci lorem ornare id sed quis. Tincidunt varius neque,&nbsp;
        bibendum fermentum, ligula arcu mi. Sed sit scelerisque&nbsp;
        tincidunt massa feugiat fermentum, tincidunt.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;
        Sit vivamus proin urna, neque neque vitae at pretium.&nbsp;
        Orci lorem ornare id sed quis. Tincidunt varius neque,&nbsp;
        bibendum fermentum, ligula arcu mi. Sed sit scelerisque&nbsp;
        tincidunt massa feugiat fermentum, tincidunt.
      </p>
    </section>
    <section id='part-2' className='container'>
      <h1> Part II</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;
        Sit vivamus proin urna, neque neque vitae at pretium.&nbsp;
        Orci lorem ornare id sed quis. Tincidunt varius neque,&nbsp;
        bibendum fermentum, ligula arcu mi. Sed sit scelerisque&nbsp;
        tincidunt massa feugiat fermentum, tincidunt.
      </p>
    </section>
  </>);
};

ReactDom.render(<TechnicalStuffPage/>, document.getElementById('root'));
