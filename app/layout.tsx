'use client'
import Navbar from "./components/Navbar";
import Context from "./context/ContextProvider";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout(props: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Wallpaper Spot</title>
      </head>
      <body>
        <NextUIProvider>
          <Navbar />
          <Context>
            {props.modal}
            {props.children}
          </Context>
        </NextUIProvider>
      </body>
    </html>
  );
}
