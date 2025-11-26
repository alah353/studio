import Image from 'next/image';
import React from 'react';

export function HorseLogo(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <Image
      src="/ferrari.svg"
      alt="Horse S.L. Logo"
      width={32}
      height={32}
      // This filter combination makes the black SVG appear white while preserving details.
      // invert(1) makes it white, brightness(0.8) tones it down slightly,
      // contrast(2) enhances shadows, and drop-shadow adds depth.
      style={{
        filter: 'invert(1) brightness(0.8) contrast(2) drop-shadow(0 0 5px rgba(255,255,255,0.3))'
      }}
      className={props.className}
    />
  );
}
