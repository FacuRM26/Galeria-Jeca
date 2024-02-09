"use client"
import Link from "next/link";

export default function MainPage() {
  return (
    <div>
      <div className="main_page_imgs">
      <div className="main_page_bg_img" style={{backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 82.29%), url("https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F5.jpg?alt=media&token=f545b17e-3a66-4875-af25-bffe007f463d")'}}>
      <div className="main_page_portrait_img" style={{backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F6.jpeg?alt=media&token=38ac117a-f9e7-40cc-942a-1b78d6e8344a")'}}>
        <h1 className="main_page_portrait_title">Galería de Jeca</h1>
      </div>
      <div className="main_page_portrait_shadow" />
      </div>
      </div>
      <div className="center_section">
        <div className="profile_section text_section">
          <p style={{textAlign: "center", marginBottom: "1.5rem", marginTop: "5rem"}}>Una joven emprendedora de la zona de Orotina tiene un talento excepcional para el maquillaje de caracterización y se dedica a brindar sus servicios profesionales de maquillaje, cursos de automaquillaje y ha diversificado sus servicios, y ahora ofrece múltiples opciones en su negocio.</p>
        </div>
      </div>

        <div className="center_section order_vertically bg_shadow clr_dark_gray">
          <h1 className="mp_title">Galería</h1>
          <div className="items">
            <div className="photo">
                <img width="220px" height="220px" style={{objectFit:"cover"}} src="https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F4.jpg?alt=media&token=d64a6369-4c4a-4be9-9db8-8372e5e90740" />
                <p>Cosplay It</p>
            </div>
            <div className="photo">
                <img width="220px" height="220px" style={{objectFit:"cover"}} src="https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F3.jpg?alt=media&token=4105b80d-af7a-48e3-9d8d-6c666dcfd79e" />
                <p>Catrina</p>
            </div>
            <div className="photo">
                <img width="220px" height="220px" style={{objectFit:"cover"}} src="https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F1.jpg?alt=media&token=01e1548b-40d9-4c27-869b-243dfb651f1b" />
                <p>Boda</p>
            </div>
          </div>
          <Link href="/gallery">
            <button className="mp_button round_button bg_dark_gray clr_bg clickable" style={{color: "white" }}>
              Ver más
            </button>
          </Link>
        </div>
        <div className="bg_dark_gray clr_bg order_horizontally">
  <div className="order_vertically center_section" style={{ width: "80%", color: "white" }}>
    <h2 className="mp_title">Maquillaje especializado</h2>
    <p style={{ textAlign: "center" }} className="text_section">
      Puede contactar para agendar una cita de maquillaje del diseño que desee.
    </p>
    <div>
      <button className="mp_button round_button clr_dark_gray bg_bg" style={{color: "white" }}>
        Contacto
      </button>
      <button className="mp_button round_button clr_dark_gray bg_bg" style={{color: "white" }}>
        Agenda
      </button>
    </div>
          </div>
          <img className="fade_left mp_me_section_img" style={{minWidth: "20%", maxHeight:"50vh", objectFit: "cover"}} src="https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F7.jpeg?alt=media&token=053c6432-2aa7-4d3d-8627-29fd4211540e"/>
        </div>
        <div className="center_section order_vertically bg_shadow clr_dark_gray">
          <h1 className="mp_title">Tienda</h1>
          <div className="items">
            <div className="item">
              <img width="220px" height="220px" style={{objectFit:"cover"}} src="https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F9.webp?alt=media&token=165fa114-a643-4758-a9ea-1b20bef03cdf" />
                <p>₡7500</p>
            </div>
            <div className="item">
              <img width="220px" height="220px" style={{objectFit:"cover"}} src="https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F8.jpg?alt=media&token=b866fe7f-6f5a-42e1-9149-259885dcf5fa" />
                <p>₡14999</p>
            </div>
            <div className="item">
              <img width="220px" height="220px" style={{objectFit:"cover"}} src="https://firebasestorage.googleapis.com/v0/b/proyecto-d3279.appspot.com/o/images%2Fpost%2F10.webp?alt=media&token=c5a8884d-995d-43ea-8a6d-d8f3cd6b24c9" />
                <p>₡1500</p>
            </div>
          </div>
          <Link href="/shop">
            <button className="mp_button round_button bg_dark_gray clr_bg clickable" style={{color: "white" }}>
              Ver más
            </button>
          </Link>
        </div>
    </div>
  );
}