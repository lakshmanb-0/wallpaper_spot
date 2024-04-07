import Provider from "./components/Provider/Provider";
import "./globals.css";

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
        <Provider>
          <div id="modal-root" />

          {props.children}
          {props.modal}
        </Provider>
      </body>
    </html>
  );
}
