'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'}
      priority
      width={430}
      height={148}
      className="h-10 w-auto pr-4 rounded"
      alt="Logo"
    />
  );
}
