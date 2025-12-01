import Image from 'next/image';
import React from 'react';

export function HorseLogo(props: { className?: string }) {
  return (
    <Image
      src="/Mercedes.png"
      alt="Logo"
      width={32}
      height={32}
      className={props.className}
    />
  );
}
