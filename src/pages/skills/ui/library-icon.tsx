interface LibraryIconProps {
  size?: number;
}

export function LibraryIcon({ size = 16 }: LibraryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.8333 0.5V15.5M1.3333 0.5H6.3333C6.7936 0.5 7.1667 0.8731 7.1667 1.3333V14.6667C7.1667 15.1269 6.7936 15.5 6.3333 15.5H1.3333C0.8731 15.5 0.5 15.1269 0.5 14.6667V1.3333C0.5 0.8731 0.8731 0.5 1.3333 0.5ZM15 13.75C15.1667 14.1667 14.9167 14.6667 14.5 14.8333L12.9167 15.4167C12.5 15.5833 12 15.3333 11.8333 14.9167L7.25 2.25C7.0833 1.8333 7.3333 1.3333 7.75 1.1667L9.3333 0.5833C9.75 0.4167 10.25 0.6667 10.4167 1.0833L15 13.75Z"
        stroke="currentColor"
        strokeWidth="1.383"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
