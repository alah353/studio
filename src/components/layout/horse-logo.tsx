import React from 'react';
import Image from 'next/image';

export function HorseLogo(props: { className?: string }) {
  return (
    <Image
      src="/logocaballo.png"
      alt="Horse S.L. Logo"
      width={32}
      height={32}
      className={props.className}
    />
  );
}
