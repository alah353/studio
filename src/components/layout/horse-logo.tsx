import React from 'react';
import Image from 'next/image';

export function HorseLogo(props: { className?: string }) {
  return (
    <Image
      src="/logocaballo.png"
      alt="Horse S.L. Logo"
      width={60}
      height={60}
      className={props.className}
    />
  );
}
