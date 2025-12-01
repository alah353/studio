import React from 'react';
import Image from 'next/image';

export function HorseLogo(props: { className?: string }) {
  return (
    <Image
      src="/logocaballo.png"
      alt="Horse S.L. Logo"
      width={80}
      height={80}
      className={props.className}
    />
  );
}
