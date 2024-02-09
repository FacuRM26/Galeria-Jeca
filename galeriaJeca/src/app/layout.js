import "./globals.css"
import CustomHeader from "./header"
import CustomFooter from "./footer"
import { UserProvider } from "./user/user"


export const metadata = {
  title: "Galeria de Jeca",
  description: "Página sobre la Galeria de Jeca",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="page_container">
          <CustomHeader/>
          <div className="content_container">{children}</div>
          <CustomFooter/>
        </body>
      </UserProvider>
    </html>
  )
}
