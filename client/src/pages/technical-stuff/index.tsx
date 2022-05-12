import './style.scss';

import React, { FC } from 'react';
import ReactDom from 'react-dom';
import Navbar from 'components/Navbar';
import StepContent from './StepContent';
import ExternalLink from './ExternalLink';

const TechnicalStuffPage: FC = () => {
  return (<>
    <Navbar base='.'/>
    <header className='container home-background center'>
      <div className='content-wrapper flex-col align-center'>
        <h1 className='banner-text'>What is Tensor Hero?</h1>
        <p className='banner-text'>
          Tensor Hero is a web-based <em>Machine-Learning empowered</em>
          &nbsp;charting tool that auto-generates playable charts
          for Clone Hero. It is also a place to share and explore
          content created by other users.
        </p>
      </div>
    </header>
    <section id='how-it-all-works' className='container'>
      <h1>How It All Works</h1>
      <p>
        Curious what&apos;s happening under the hood?
        Below we explain how a song goes from an audio file to a chart file.
      </p>
      <div className='step-by-step-content-wrapper'>
        <StepContent no={1} title='separation'>
          <p>
            After uploading, the song audio file is read by
            a source separation function, which allows
            us to identify and isolate the guitar audio from
            the rest of the song.
          </p>
          <img className='graphics' src='images/separation.gif'
            // eslint-disable-next-line max-len
            alt='A multicolored waveform labeled Audio splits into four waves of different colors, labeled Vocal, Guitar, Bass, Percussion; we zoom in on the wave for Guitar.'/>
        </StepContent>
        <StepContent no={2} title='spectrograms'>
          <p>
          With just the guitar&apos;s audio,
          we convert the sound frequencies into a spectrogram,
          which resembles a complicated graph.
          </p>
          <img className='graphics' src='images/spectrogram.gif'
            // eslint-disable-next-line max-len
            alt='The wave for Guitar from Step 1 breaks apart into a grid of dots of different shades, representing the different sounds over time.'/>
        </StepContent>
        <StepContent no={3} title='flatten'>
          <p>
            We then take the spectrogram and squash it into
            a single data array, which lists the values, in order,
            of the notes heard from the guitar.
          </p>
          <img className='graphics' src='images/flatten.gif'
            // eslint-disable-next-line max-len
            alt='The grid of dots from Step 2 is compressed into a single row.'/>
        </StepContent>
        <StepContent no={4} title='feed'>
          <p>
            Now we are ready to feed this into the machine learning model.
            We cannot process the whole song at once, so we break it
            into pieces that are each about 4 seconds long,
            and feed them in order into the model.
          </p>
          <img className='graphics' src='images/feed.gif'
            // eslint-disable-next-line max-len
            alt='The string of dots from Step 3 is divided into pieces, which move one-by-one across the screen and merge into a purple square.'/>
        </StepContent>
        <StepContent no={5} title='transform'>
          <p>
            As each piece is processed, the model uses its library of charts
            to choose a good representation in Clone Hero notes.
          </p>
          <img className='graphics' src='images/transform.gif'
            // eslint-disable-next-line max-len
            alt='The purple square from Step 4 tracks across the screen like a cursor, leaving behind sequences of numbers and colored circles.'/>
        </StepContent>
        <StepContent no={6} title='chart-ify'>
          <p>
            This output is stitched back together,
            then converted into the format of a Clone Hero level.
          </p>
          <img className='graphics' src='images/chartify.gif'
            // eslint-disable-next-line max-len
            alt='The numbers and circles from Step 5 are arranged on a musical staff, which will become the game level.'/>
        </StepContent>
      </div>
    </section>
    <section id='tensorhero-model' className='container'>
      <h1>The TensorHero Model</h1>
      <p>
        The model predicting the notes for the chart file
        is a <strong>Transformer</strong>, which learned about
        Clone Hero charts from observing hundreds of hours of examples of
        guitar audio with corresponding charts, both from the original
        Guitar Hero game series and Clone Hero charters.
        The transformer model follows a neural-network architecture,
        and is essentially performing a type of &ldquo;translation,&rdquo;
        where it is learning to equate one input &ldquo;language&rdquo;
        with another output &ldquo;language.&rdquo;
        There are some great articles from the machine learning community
        exploring what Transformers are, how they work,
        and their applications in the real world.
      </p>
      <div className='center' style={{ marginBottom: '2rem' }}>
        <img className='illustration' src='images/transformer.png'/>
        <p className='image-caption'>
          From &ldquo;Attention Is All You Need&rdquo; by Vaswani et al.
        </p>
      </div>
      <div className='external-link flex-row'>
        <span className='highlight'>More links</span>
        <div className='link-container flex-col'>
          <ExternalLink article='How Transformers Work' url='https://towardsdatascience.com/transformers-141e32e69591'/>
          <ExternalLink article='What is a Transformer?' url='https://blogs.nvidia.com/blog/2022/03/25/what-is-a-transformer-model/'/>
          <ExternalLink article='Transformers Illustrated' url='https://jalammar.github.io/illustrated-transformer/'/>
        </div>
      </div>
    </section>
  </>);
};

ReactDom.render(<TechnicalStuffPage/>, document.getElementById('root'));
