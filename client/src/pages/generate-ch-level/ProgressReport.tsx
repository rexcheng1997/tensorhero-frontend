import React, { FC, useEffect, useRef, useState } from 'react';
import CheckMarkIcon from 'assets/svg/check-mark.svg';

export enum ModelStep {
  UPLOADING,
  SEPARATING, SPECTROGRAMS, FLATTEN_ARRAY,
  FEED, FLATTEN_OUTPUT, CONVERT_TO_CHART,
  COMPLETE,
}

type StepInfo = {
  header: string,
  title: string,
  image: string,
};

const STEPS: Record<ModelStep, StepInfo> = {
  [ModelStep.UPLOADING]: {
    header: 'Uploading',
    title: 'Upload',
    image: 'images/upload.gif',
  },
  [ModelStep.SEPARATING]: {
    header: 'Separating source to extract guitar audio',
    title: 'Separation',
    image: 'images/upload.gif',
  },
  [ModelStep.SPECTROGRAMS]: {
    header: 'Analyzing frequency spectrogram',
    title: 'Spectrograms',
    image: 'images/upload.gif',
  },
  [ModelStep.FLATTEN_ARRAY]: {
    header: 'Flattening spectrogram',
    title: 'Flatten',
    image: 'images/upload.gif',
  },
  [ModelStep.FEED]: {
    header: 'Feeding into the model',
    title: 'Feed',
    image: 'images/upload.gif',
  },
  [ModelStep.FLATTEN_OUTPUT]: {
    header: 'Flattening model output',
    title: 'Flatten',
    image: 'images/upload.gif',
  },
  [ModelStep.CONVERT_TO_CHART]: {
    header: 'Converting to chart file',
    title: 'Chartify',
    image: 'images/upload.gif',
  },
  [ModelStep.COMPLETE]: {
    header: 'Rendering your chart',
    title: 'Complete',
    image: 'images/upload.gif',
  },
};

const ProgressReport: FC = () => {
  const longPoolingEvent = useRef<number>();
  const [stepEnum, setStepEnum] = useState<ModelStep>(ModelStep.UPLOADING);
  const [stepInfo, setStepInfo] = useState<StepInfo>(STEPS[stepEnum]);
  const totalSteps = Object.keys(STEPS).length;

  const calculatePercentage = (
      i: number,
  ): number => Math.min(100, Math.ceil(i / (totalSteps - 1) * 100));

  useEffect(() => {
    const longPooling = () => {
      const steps: (keyof typeof ModelStep)[] = [
        'UPLOADING',
        'SEPARATING', 'SPECTROGRAMS', 'FLATTEN_ARRAY',
        'FEED', 'FLATTEN_OUTPUT', 'CONVERT_TO_CHART',
        'COMPLETE',
      ];
      const random = Math.floor(Math.random() * totalSteps);
      setStepEnum(ModelStep[steps[random]]);
    };

    longPoolingEvent.current = window.setInterval(longPooling, 2e3);

    return () => {
      clearInterval(longPoolingEvent.current);
    };
  }, []);

  useEffect(() => {
    setStepInfo(STEPS[stepEnum]);
  }, [stepEnum]);

  return (
    <div className='container inner-container center'>
      <div className='flex-col align-center' style={{
        width: '100%', marginBottom: '3rem',
      }}>
        <h2 className='section-title'>{stepInfo.header}</h2>

        <img className='progress-illustration'
          src={stepInfo.image} alt={stepInfo.title}/>

        <div className='progress flex-col align-center'>

          <span className='progress-percentage'>
            {calculatePercentage(stepEnum)}%
          </span>

          <div className='progress-bar-wrapper'>
            <div className='progress-bar'>
              <div className='progress-bar-inner'
                style={{ width: `${calculatePercentage(stepEnum)}%` }}/>
              {Object.values(STEPS).map((_step, i) => (
                <div key={i} className={
                  'progress-checkpoint' + (i === stepEnum ? ' active' : '')
                } style={{ left: `${calculatePercentage(i)}%` }}/>
              ))}
            </div>

            {Object.values(STEPS).map((step, i) => (
              <div key={i} className='step-summary flex-col align-center'
                style={{ left: `${calculatePercentage(i)}%` }}>
                <span className='step-title'>
                  {step.title}
                </span>
                <CheckMarkIcon className={i < stepEnum ? 'completed' : ''}/>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProgressReport;
