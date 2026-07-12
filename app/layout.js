import { Inter, Playfair_Display, Alex_Brush } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    style: ["normal", "italic"],
});

const alexBrush = Alex_Brush({
    variable: "--font-alex",
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "Hambalyo - Digital Wedding Message Wall",
    description: "Leave a beautiful message for the happy couple. A digital wedding wish wall crafted with love.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable} ${alexBrush.variable}`}>
            <head>
                {/* FontAwesome */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
