import React from 'react';

interface InteractiveProps {
  src: string;
  type: 'visualization' | 'video' | 'image';
}

const Interactive: React.FC<InteractiveProps> = ({ src, type }) => {
  return (
    <div className="my-4 pr-1">
      {type === 'visualization' && (
        <iframe
          id="embedded-human"
          frameBorder="0"
          style={{ aspectRatio: '4 / 3', width: '100%' }}
          allowFullScreen={true}
          loading="lazy"
          src={src}></iframe>
      )}
      {type === 'video' && (
        <div>
          {/* Add request to generate video */}
          <iframe
            id="embedded-video"
            frameBorder="0"
            style={{ aspectRatio: '16 / 9', width: '100%' }}
            allowFullScreen={true}
            loading="lazy"
            src={src}></iframe>
        </div>
      )}
      {type === 'image' && (
        <div>
          {/* Add request to generate image */}
          <img src={src} alt="Generated content" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Interactive;
