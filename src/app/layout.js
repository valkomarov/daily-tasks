import '../styles/variables.css';
import '../styles/global.css';
import '../styles/theme-color.css';
import '../styles/theme-bw.css';

export const metadata = {
  title: 'Task Tracker',
  description: 'Track your tasks with e-ink display support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f5f5f5" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
