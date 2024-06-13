import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Market Yönetim Sistemi',
  description: 'Marketlerinizi ve ürünlerinizi yönetin',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <header>
          <h1>Market Yönetim Sistemi</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
