import "./globals.css";

export const metadata = {
  title: "KONTUR — студия детейлинга в Москве",
  description:
    "Профессиональная защита кузова, детейлинг-полировка, керамика 9H, химчистка салона и оклейка полиуретаном.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F0F0E",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
