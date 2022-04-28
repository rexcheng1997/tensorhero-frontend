import React, { FC } from 'react';

type ExternalLinkProps = {
  article: string,
  url: string,
}

const ExternalLink: FC<ExternalLinkProps> = ({
  article, url,
}) => {
  return (
    <p className='external-link flex-row'>
      <span className='highlight'>More links</span>
      <span>
        {article}&nbsp;&nbsp;
        <a href={url} target='_blank' rel='noreferrer'>{url}</a>
      </span>
    </p>
  );
};

export default ExternalLink;
