import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import InputField from 'components/Form/InputField';
import Button from 'components/Button';
import UploadIcon from 'assets/svg/upload.svg';

export type SongInfo = {
  title: string,
  artist: string,
  genre?: string,
  album?: string,
  year?: string,
  audio: File,
};

type UploadProps = {
  onSubmit: (formData: FormData) => void,
}

const Upload: FC<UploadProps> = ({
  onSubmit: uploadEventHandler,
}) => {
  const [audioUploadHint, setAudioUploadHint] = useState<string>(
      'supported format: .mp3 .wav .ogg',
  );
  const [audioFile, setAudioFile] = useState<File>();
  const [coverUploadHint, setCoverUploadHint] = useState<string>(
      'image preview will show up there \u2192',
  );
  const [coverFile, setCoverFile] = useState<File>();
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');

  const createInputEventHandler = (
      setState: React.Dispatch<React.SetStateAction<File | undefined>>,
  ) => (
      event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileList = event.target.files;
    if (!_.isNil(fileList)) {
      setState(fileList[0]);
    }
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    uploadEventHandler(formData);
  };

  useEffect(() => {
    if (_.isNil(audioFile)) return;

    setAudioUploadHint(audioFile.name);
  }, [audioFile]);

  useEffect(() => {
    if (_.isNil(coverFile)) return;

    setCoverUploadHint(coverFile.name);
    setCoverImageUrl(URL.createObjectURL(coverFile));

    return () => {
      if (coverImageUrl.length > 0) {
        URL.revokeObjectURL(coverImageUrl);
      }
    };
  }, [coverFile]);

  return (
    <div className='container inner-container center flex-col'>
      <h2 className='section-title'>Upload Music</h2>
      <form id='upload-music-form' className='upload-music-form flex-col'
        onSubmit={formSubmitHandler}>
        <div className='flex-row align-center space-between form-row extended'>
          <InputField htmlLabel='song title' name='title' required/>
          <InputField htmlLabel='artist' name='artist' required/>
        </div>
        <div className='flex-row align-center form-row'>
          <InputField htmlLabel='genre' name='genre'/>
          <InputField htmlLabel='album' name='album'/>
          <InputField htmlLabel='year' name='year'/>
        </div>
        <div className='flex-row align-center'
          style={{ marginTop: '1rem' }}>
          <label htmlFor='audio' className='upload-file-input'>
            <UploadIcon width='12' height='21' viewBox='0 0 24 28'/>
            <span>choose audio file</span>
          </label>
          <input type='file' name='audio' id='audio' accept='.mp3,.wav,.ogg'
            onInput={createInputEventHandler(setAudioFile)} required/>
          <small>{audioUploadHint}</small>
        </div>
        <div className='flex-row align-center'
          style={{ position: 'relative', marginTop: '2rem' }}>
          <label htmlFor='cover' className='upload-file-input'>
            <UploadIcon width='12' height='21' viewBox='0 0 24 28'/>
            <span>choose cover image</span>
          </label>
          <input type='file' name='cover' id='cover' accept='image/*'
            onInput={createInputEventHandler(setCoverFile)}/>
          <small>{coverUploadHint}</small>
          <div className='image-preview center' style={{
            backgroundImage: coverImageUrl.length > 0 ?
              `url(${coverImageUrl})` : 'none',
          }}>
            {coverImageUrl.length === 0 && <small>preview</small>}
          </div>
        </div>
      </form>
      <Button type='submit' form='upload-music-form'
        className='upload-music-form-submit'>
        <span>Submit</span>
      </Button>
    </div>
  );
};

export default Upload;
