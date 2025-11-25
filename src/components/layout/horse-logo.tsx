import React from 'react';

export function HorseLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2.5C11.3 2.5 10.7 3 10.5 3.6L10.3 4.2C9.5 5.9 8.2 7.3 6.6 8.2L6 8.5C5.4 8.8 5 9.4 5 10V11C5 12.1 5.9 13 7 13H8V15H7C6.4 15 6 15.4 6 16V18C6 18.6 6.4 19 7 19H8V21C8 21.6 8.4 22 9 22H10C10.6 22 11 21.6 11 21V19H13V21C13 21.6 13.4 22 14 22H15C15.6 22 16 21.6 16 21V18.5C16 17.1 15.4 15.8 14.4 14.8L13.5 14L14.6 13.3C16.9 11.8 18.4 9.3 18.7 6.5L18.8 6C18.9 5.2 18.5 4.4 17.8 3.9L16.5 3L15.3 2.2C14.7 1.8 13.9 1.5 13.1 1.5C12.5 1.5 12.3 1.8 12.3 2.3C12.3 2.4 12.4 2.5 12.5 2.5H12Z" />
    </svg>
  );
}
