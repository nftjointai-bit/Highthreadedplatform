import { type PropsWithChildren } from 'react';

interface ContainerProps {
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
}

const SIZE = {
  narrow: 'max-w-2xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
} as const;

export default function Container({
  children,
  className = '',
  size = 'default',
}: PropsWithChildren<ContainerProps>) {
  return (
    <div className={`mx-auto w-full ${SIZE[size]} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
