import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trello | Главная',
  description:
    'Trello - это удобное приложение для управления задачами и проектами. Создавайте, отслеживайте и делегируйте задачи на своих проектах с помощью Trello. Узнайте, как упростить свою работу с Trello.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
