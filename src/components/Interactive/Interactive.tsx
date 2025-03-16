import React from 'react';

interface InteractiveProps {
  src: string;
  type: 'visualization' | 'video' | 'image';
}

const Interactive: React.FC<InteractiveProps> = ({ src, type }) => {
  console.log('Interactive component rendered ', src);

  return (
    <div className="my-4 pr-1">
      {type === 'visualization' && (
        <iframe
          id="embedded-human"
          style={{ aspectRatio: '4 / 3', width: '100%' }}
          allowFullScreen={true}
          loading="lazy"
          src={src}></iframe>
      )}
      {type === 'video' && (
        <div>
          <iframe
            id="embedded-video"
            style={{ aspectRatio: '16 / 9', width: '100%' }}
            allowFullScreen={true}
            loading="lazy"
            src={src}></iframe>
        </div>
      )}
      {type === 'image' && (
        <img src={src} alt="Generated content" style={{ objectFit: 'cover' }} />
      )}
    </div>
  );
};

export default Interactive;
