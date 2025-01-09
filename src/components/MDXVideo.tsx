import React from 'react';

interface MDXVideoProps {
  src: string;
  title?: string;
  className?: string;
}

const MDXVideo = ({ src, title, className = "" }: MDXVideoProps) => {
  return (
    <div className={`relative w-full aspect-video rounded-lg overflow-hidden ${className}`}>
      <video
        className="w-full h-full object-cover"
        controls
        playsInline
        title={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MDXVideo;