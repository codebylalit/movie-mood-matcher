import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  slot?: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid';
  layout?: string;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({
  slot = '',
  style = { display: 'block' },
  format = 'auto',
  layout,
  className = '',
}) => {
  useEffect(() => {
    try {
      // Push the ad only if adsbygoogle is defined
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-2484863449091466"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout && { 'data-ad-layout': layout })}
      />
    </div>
  );
};

export default AdSense; 