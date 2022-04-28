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
          &nbsp;charting tool that auto-generates playable charts for Clone Hero
          &nbsp;(one sentence abt the community and support chart-sharing).
        </p>
      </div>
    </header>
    <section id='how-it-all-works' className='container'>
      <h1>How It All Works</h1>
      <p>
        Curious what&apos;s happening under the hood?&nbsp;
        Below we explain how a song goes from an audio file to a chart file.
      </p>
      <div className='step-by-step-content-wrapper'>
        <StepContent no={1} title='separation'>
          <p>
            After uploading, the song audio file is immediately&nbsp;
            run through a source separation function, which allows&nbsp;
            us to extract only the guitar audio from the full song.
          </p>
        </StepContent>
        <StepContent no={2} title='spectrograms'>
          <p>
            With just the guitar&apos;s audio,&nbsp;
            we convert the frequencies into a spectrogram,&nbsp;
            which is a standard data structure for analysis and&nbsp;
            processing of frequencies. You can think about it as&nbsp;
            a graph where the x-axis represents the timestep of the song,&nbsp;
            and the y-axis represents the observed frequency values.
          </p>
        </StepContent>
        <StepContent no={3} title='flatten'>
          <p>
            We then take the spectrogram and squash it into&nbsp;
            a single data array, which is a fancy way of&nbsp;
            saying a list of values. These values represent,&nbsp;
            in order, the notes heard from the guitar.
          </p>
        </StepContent>
        <StepContent no={4} title='feed'>
          <p>
            Now we are ready to feed this into the machine learning model.&nbsp;
            We cannot feed the whole song at once, so we break each song&nbsp;
            into pieces that are each about 4 seconds long,&nbsp;
            and feed them in order into the model.
          </p>
        </StepContent>
        <StepContent no={5} title='flatten'>
          <p>
            As each piece is ingested, the model predicts corresponding&nbsp;
            CloneHero notes as output, which are then concatenated&nbsp;
            all together to make it a single long list of notes for&nbsp;
            the whole song.
          </p>
        </StepContent>
        <StepContent no={6} title='chart-ify'>
          <p>
            This output format, which is another long list of values,&nbsp;
            is then transformed into a chart format that is readable by&nbsp;
            the CloneHero game.
          </p>
        </StepContent>
      </div>
    </section>
    <section id='tensorhero-model' className='container'>
      <h1>The TensorHero Model</h1>
      <p>
        The model that is predicting the notes for the chart file&nbsp;
        is a <strong>Transformer</strong>, a machine learning model that&nbsp;
        has been trained. We taught our model how to predict the notes&nbsp;
        by showing it hundreds of hours of examples of&nbsp;
        guitar audio with corresponding charts, both from the official&nbsp;
        GuitarHero game and CloneHero charters. The transformer model&nbsp;
        follows a neural-network architecture, and is essentially&nbsp;
        performing a type of &ldquo;translation,&rdquo; where it&apos;s&nbsp;
        learning to equate one input &ldquo;language&rdquo; with another&nbsp;
        output &ldquo;language.&rdquo; There are some great articles from&nbsp;
        the machine learning community exploring what Transformers are,&nbsp;
        how they work, and their applications in the real world.
      </p>
      <ExternalLink article='How Transformers Work' url='https://towardsdatascience.com/transformers-141e32e69591'/>
      <ExternalLink article='What is a Transformer?' url='https://blogs.nvidia.com/blog/2022/03/25/what-is-a-transformer-model/'/>
      <ExternalLink article='Transformers Illustrated' url='https://jalammar.github.io/illustrated-transformer/'/>
    </section>
  </>);
};

ReactDom.render(<TechnicalStuffPage/>, document.getElementById('root'));
