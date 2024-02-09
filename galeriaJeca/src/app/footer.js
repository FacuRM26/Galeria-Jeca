"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CustomFooter() {
  return (
      <>
        { usePathname() != "/cart" && usePathname() != "/purchase" &&
        <div className="custom_footer order_vertically">
          
          <div style={{width:"40%", display:"flex", justifyContent:"space-evenly"}}>
            <Link href="https://www.facebook.com/duenderfsmaquillista/" target="_blank"><img className="footer_icon" src="./Facebook.svg" fill="black"/></Link>
            <Link href="https://google.com" target="_blank"><img className="footer_icon" src="./WhatsApp.svg" fill="black"/></Link>
            <Link href="https://www.instagram.com/duenderfs/?hl=es-la" target="_blank"><img className="footer_icon" src="./Instagram.svg" fill="black"/></Link>
            <Link href="https://google.com" target="_blank"><img className="footer_icon" src="./YouTube.svg" fill="black"/></Link>
            <Link href="https://twitter.com/Duenderfs/status/1673190531659186182" target="_blank"><img className="footer_icon" src="./Twitter.svg" fill="black"/></Link>
          </div>
        </div>
        }
      </>
  );
}