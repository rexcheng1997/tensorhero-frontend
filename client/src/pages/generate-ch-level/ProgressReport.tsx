import React, { FC, useEffect, useRef, useState } from 'react';
import { ML_SERVER } from 'config';
import CheckMarkIcon from 'assets/svg/check-mark.svg';
import Snackbar from 'components/Snackbar';

export enum ModelStep {
  UPLOADING,
  SEPARATION, SPECTROGRAM, FLATTEN_ARRAY,
  FEED, TRANSFORM, CONVERT_TO_CHART,
  COMPLETED,
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
  [ModelStep.SEPARATION]: {
    header: 'Separating source to extract guitar audio',
    title: 'Separation',
    image: 'images/separation.gif',
  },
  [ModelStep.SPECTROGRAM]: {
    header: 'Analyzing frequency spectrogram',
    title: 'Spectrograms',
    image: 'images/spectrogram.gif',
  },
  [ModelStep.FLATTEN_ARRAY]: {
    header: 'Flattening spectrogram',
    title: 'Flatten',
    image: 'images/flatten.gif',
  },
  [ModelStep.FEED]: {
    header: 'Feeding into the model',
    title: 'Feed',
    image: 'images/feed.gif',
  },
  [ModelStep.TRANSFORM]: {
    header: 'Transforming model output',
    title: 'Transform',
    image: 'images/transform.gif',
  },
  [ModelStep.CONVERT_TO_CHART]: {
    header: 'Converting to chart file',
    title: 'Chartify',
    image: 'images/chartify.gif',
  },
  [ModelStep.COMPLETED]: {
    header: 'Rendering your chart',
    title: 'Complete',
    image: 'images/upload.gif',
  },
};

// eslint-disable-next-line max-len
const SERVICE_NOT_AVAILABLE_WARNING = 'Backend service not available. Showing a demo of the workflow.';

type CreateJobResponseSchema = {
  jobId: string,
};
type GetJobStatusResponseSchema = {
  status: keyof typeof ModelStep,
  chart?: string,
};

type ProgressReportProps = {
  data: FormData,
  onChartReady: (chart: string) => void,
};

const ProgressReport: FC<ProgressReportProps> = ({
  data: formData, onChartReady: setChart,
}) => {
  const stepIndex = useRef<number>(0);
  const longPollingEvent = useRef<number>();
  const [stepEnum, setStepEnum] = useState<ModelStep>(ModelStep.UPLOADING);
  const [stepInfo, setStepInfo] = useState<StepInfo>(STEPS[stepEnum]);
  const [message, setMessage] = useState<string>('');
  const totalSteps = Object.keys(STEPS).length;

  const calculatePercentage = (
      i: number,
  ): number => Math.min(100, Math.ceil(i / (totalSteps - 1) * 100));

  useEffect(() => {
    fetch(ML_SERVER.createJob, {
      method: 'PUT',
      body: formData,
    }).then(
        (response) => response.json(),
    ).then(({ jobId }: CreateJobResponseSchema) => {
      longPollingEvent.current = window.setInterval(() => {
        fetch(ML_SERVER.getJobStatus + '?' + new URLSearchParams({
          jobId,
        })).then(
            (response) => response.json(),
        ).then(({ status, chart }: GetJobStatusResponseSchema) => {
          setStepEnum(ModelStep[status]);

          if (ModelStep[status] === ModelStep.COMPLETED && chart) {
            setChart(chart);
            clearInterval(longPollingEvent.current);
          }
        });
      }, 2e3);
    }).catch(() => {
      setMessage(SERVICE_NOT_AVAILABLE_WARNING);

      longPollingEvent.current = window.setInterval(() => {
        stepIndex.current++;

        if (stepIndex.current >= totalSteps) {
          clearInterval(longPollingEvent.current);
          stepIndex.current = 0;
          setMessage('');

          fetch('examples/Andy McKee - Ouray/notes.chart').then(
              (response) => response.text(),
          ).then(
              (chart) => setChart(chart),
          );
        } else {
          setStepEnum(stepIndex.current);
        }
      }, 8e3);
    });

    return () => {
      clearInterval(longPollingEvent.current);
    };
  }, []);

  useEffect(() => {
    setStepInfo(STEPS[stepEnum]);
  }, [stepEnum]);

  return (
    <div className='container inner-container center'>
      {
        message.length > 0 && <Snackbar position='top center'>
          <small>{message}</small>
        </Snackbar>
      }
      <div className='flex-col align-center' style={{
        width: '100%', marginBottom: '3rem',
      }}>
        <h2 className='section-title center'>
          {stepInfo.header}
        </h2>

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
