import React, { FC } from 'react';

type ExternalLinkProps = {
  article: string,
  url: string,
}

const ExternalLink: FC<ExternalLinkProps> = ({
  article, url,
}) => {
  return (
    <span className='link'>
      {article}
      <a href={url} target='_blank' rel='noreferrer'>{url}</a>
    </span>
  );
};

export default ExternalLink;
