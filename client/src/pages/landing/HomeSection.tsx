import React, { FC, useEffect, useRef } from 'react';
import _ from 'lodash';
import anime from 'animejs';
import Button from 'components/Button';
import BackgroundPattern from 'assets/svg/pattern.svg';

const HomeSection: FC = () => {
  const backgroundContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // shuffle the fill-opacity of svg circles randomly at initial render
    document.querySelectorAll('#background-svg circle').forEach((circle) => {
      circle.setAttribute('fill-opacity', Math.random().toString());
    });

    const animationKeyFrames = () => {
      const NUMBER_OF_CIRCLES_TO_ANIMATE = 80;
      const circles = document.querySelectorAll('#background-svg circle');

      anime({
        targets: _.sampleSize(circles, NUMBER_OF_CIRCLES_TO_ANIMATE),
        fillOpacity: () => Math.random() * 0.8 + 0.2,
        duration: () => anime.random(618, 1618),
        easing: 'easeOutElastic(1, 0.4)',
      }).finished.then(() => {
        animationKeyFrames();
      });
    };

    const resizeBackgroundSvg = () => {
      const svg = document.getElementById(
          'background-svg',
      ) as (HTMLElement & SVGMarkerElement);
      const svgWidth = svg.viewBox.baseVal.width;
      const svgHeight = svg.viewBox.baseVal.height;

      svg.removeAttribute('width');
      svg.removeAttribute('height');

      const containerWidth = backgroundContainerRef.current!.clientWidth;
      const containerHeight = backgroundContainerRef.current!.clientHeight;

      if (containerWidth / svgWidth * svgHeight < containerHeight) {
        svg.setAttribute('height', '100%');
      } else {
        svg.setAttribute('width', '100%');
      }
    };

    animationKeyFrames();
    resizeBackgroundSvg();
    window.addEventListener('resize', resizeBackgroundSvg);

    return () => {
      window.removeEventListener('resize', resizeBackgroundSvg);
    };
  }, []);

  return (
    <section id='home' className='container page-height center'>
      <div ref={backgroundContainerRef} className='home-background-wrapper'>
        <BackgroundPattern id='background-svg' viewBox='0 0 1329 865'/>
      </div>
      <div className='content-wrapper flex-col align-center'>
        <h1 className='banner-text'>What is Tensor Hero?</h1>
        <p className='banner-text'>
          Tensor Hero is a web-based <em>Machine-Learning empowered</em>
          &nbsp;charting tool that auto-generates playable charts for Clone Hero
          &nbsp;(one sentence abt the community and support chart-sharing).
        </p>
        <Button style={{ marginTop: '5%' }}
          onClick={() => window.location.assign('generate.html')}>
          <span>generate CH level</span>
        </Button>
      </div>
    </section>
  );
};

export default HomeSection;
