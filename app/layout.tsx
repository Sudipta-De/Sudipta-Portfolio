import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sudipta De  | CSE (Data Science) Student",
  description:
     "Portfolio of Sudipta De, a B.Tech Computer Science Engineering student specializing in Data Science, showcasing projects, technical skills, and development work.",
  keywords: [
    "Sudipta De",
    "B.Tech CSE",
    "Data Science",
    "Computer Science",
    "Software Development",
    "React Developer",
    "Java Developer",
    "Web Developer",
    "Portfolio",
  ],
  metadataBase: new URL("https://Sudipta-portfolio-new.netlify.app"),
  openGraph: {
    title: "Sudipta De  | CSE (Data Science) Student",
    description:
      "Portfolio of Sudipta De featuring software development, web development, data science, and practical projects.",
    type: "website",
    url: "https://Sudipta-portfolio-new.netlify.app/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sudipta De  | Machine Learning Engineer Portfolio Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-background text-text antialiased font-sans`}
      >
        <div className="relative min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
