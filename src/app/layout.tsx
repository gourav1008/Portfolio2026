import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "../styles/globals.css";
import CinematicLoader from "@/components/ui/CinematicLoader";

import { profileData } from "@/lib/profileData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-rajdhani"
});

export const metadata: Metadata = {
    title: `${profileData.fullName} | ${profileData.title}`,
    description: `Portfolio of ${profileData.fullName}, a passionate Web Developer and MERN Stack Enthusiast from Kolkata, India. Creative problem solver crafting elegant digital experiences. Currently MERN Stack Intern at TalenIq.`,
    keywords: ["portfolio", "MERN Stack", "React", "NodeJS", "MongoDB", "Web Developer", "Gourav Gupta", "Full Stack", "Kolkata"],
    authors: [{ name: profileData.fullName }],
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#050505",
};



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`${inter.variable} ${rajdhani.variable} antialiased`}>
                <CinematicLoader />
                {children}
            </body>
        </html>
    );
}
