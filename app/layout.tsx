import type { Metadata } from "next";import "./globals.css";
export const metadata:Metadata={title:"Helix Service Desk",description:"IT assets and support operations in one secure workspace."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
