import React from 'react';
import Image from 'next/image';

export function HorseLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Image
      src="/logo.png"
      alt="Horse S.L. logo"
      width={32}
      height={32}
      {...props}
    />
  );
}
