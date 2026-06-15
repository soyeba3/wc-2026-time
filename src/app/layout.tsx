import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '২০২৬ ফিফা বিশ্বকাপ সময়সূচী | বাংলাদেশ সময় (BDT) অনুযায়ী লাইভ ম্যাচ',
  description: '২০২৬ ফিফা ফুটবল বিশ্বকাপের সম্পূর্ণ সময়সূচী বাংলাদেশ সময় (BDT) অনুযায়ী দেখুন। লাইভ ম্যাচ স্কোর, গ্রুপ টেবিল স্ট্যান্ডিংস এবং নকআউট পর্বের গতিশীল আপডেট।',
  keywords: ['ফিফা বিশ্বকাপ ২০২৬', 'বিশ্বকাপ সময়সূচী ২০২৬', 'বাংলাদেশ সময় বিশ্বকাপ', 'BDT world cup schedule', 'FIFA World Cup 2026 BDT'],
  authors: [{ name: 'Antigravity' }]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
