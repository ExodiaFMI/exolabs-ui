import React from 'react';

interface InteractiveProps {
  src: string;
}

const Interactive: React.FC<InteractiveProps> = ({ src }) => {
  return (
    <div className="my-4 pr-1">
      <iframe
        id="embedded-human"
        frameBorder="0"
        style={{ aspectRatio: '4 / 3', width: '100%' }}
        allowFullScreen={true}
        loading="lazy"
        src={src}></iframe>
    </div>
  );
};

export default Interactive;
