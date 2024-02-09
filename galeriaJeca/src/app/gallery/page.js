import React from 'react';
import './gallery.css'; 
import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="gallery_page">
      <h1 className="gallery_title center_section bg_shadow">Galería</h1>
      <Link href="/search?type=0&tag=Fantasía">
        <h2 className="clickable gallery_tag_title clr_bg bg_dark">Fantasía</h2>
      </Link>
      <div className="gallery_container">
        <div className="img_row">
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fegipcia.PNG?alt=media&token=e0124009-918c-4a28-8ada-4b907a490266&_gl=1*szrfiy*_ga*MTI1MDgwODIxNC4xNjkwNTc3MTUy*_ga_CW55HF8NVT*MTY5OTA0Nzk1My4xNTUuMS4xNjk5MDQ5Mjc4LjUxLjAuMA.." alt="photo.png 1" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2FMaquillaje-de-Halloween-para-mujer-facil-pennywise-it-maquillaje-para-halloween-de-terror.jpg?alt=media&token=7092adef-25b6-4cb6-8370-4866c904e9b5" alt="photo.png 2" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fcararota.jpg?alt=media&token=5abb2cae-85ba-44b7-84a5-3146155d00aa" alt="photo.png 3" /></Link>
        </div>
        <div className="img_row">
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fcatrina1.PNG?alt=media&token=39de236b-ac18-425f-974f-1a932df1aa60" alt="photo.png 4" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-halloween-mujer-facil-murcielagos.jpg?alt=media&token=03fc438c-8a1c-4ae5-b06b-266fe9a99dd3" alt="photo.png 5" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-de-noche.jpg?alt=media&token=66b9e9e0-3b1b-4bda-a00f-7575a7662ced" alt="photo.png 6" /></Link>
        </div>
      </div>
      <Link href="/search?type=0&tag=Eventos">
        <h2 className="clickable gallery_tag_title clr_bg bg_dark">Eventos</h2>
      </Link>

      <div className="gallery_container">
        <div className="img_row">
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-de-noche.jpg?alt=media&token=66b9e9e0-3b1b-4bda-a00f-7575a7662ced" alt="photo.png 1" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-halloween.jpg?alt=media&token=230a0919-0129-4054-8b57-56dff238e600" alt="photo.png 2" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-para-halloween-telaranas-y-brillos_7cf3577c_230918160539_1280x1280.jpg?alt=media&token=de9a6d7f-ba93-497b-9ce6-0b8d80da6973" alt="photo.png 3" /></Link>
        </div>
        <div className="img_row">
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2FMaquillaje-de-Halloween-para-mujer-facil-pennywise-it-maquillaje-para-halloween-de-terror.jpg?alt=media&token=7092adef-25b6-4cb6-8370-4866c904e9b5" alt="photo.png 4" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-de-noche.jpg?alt=media&token=66b9e9e0-3b1b-4bda-a00f-7575a7662ced" alt="photo.png 5" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-de-noche.jpg?alt=media&token=66b9e9e0-3b1b-4bda-a00f-7575a7662ced" alt="photo.png 6" /></Link>
        </div>
      </div>

      <Link href="/search?type=0&tag=Social">
        <h2 className="clickable gallery_tag_title clr_bg bg_dark">Social</h2>
      </Link>

      <div className="gallery_container">
        <div className="img_row">
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje1.png?alt=media&token=7da4b681-9e41-477e-b7ce-a6076d036718" alt="photo.png 1" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-de-noche.jpg?alt=media&token=66b9e9e0-3b1b-4bda-a00f-7575a7662ced" alt="photo.png 2" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fegipcia.PNG?alt=media&token=e0124009-918c-4a28-8ada-4b907a490266&_gl=1*szrfiy*_ga*MTI1MDgwODIxNC4xNjkwNTc3MTUy*_ga_CW55HF8NVT*MTY5OTA0Nzk1My4xNTUuMS4xNjk5MDQ5Mjc4LjUxLjAuMA.." alt="photo.png 3" /></Link>
        </div>
        <div className="img_row">
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje-de-noche.jpg?alt=media&token=66b9e9e0-3b1b-4bda-a00f-7575a7662ced" alt="photo.png 4" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2FMaquillaje-de-Halloween-para-mujer-facil-pennywise-it-maquillaje-para-halloween-de-terror.jpg?alt=media&token=7092adef-25b6-4cb6-8370-4866c904e9b5" alt="photo.png 5" /></Link>
          <Link className="gallery_img" href="/post?id=AOw1SsDNE1w4OzhbamBB"><img src="https://firebasestorage.googleapis.com/v0/b/duende-801d5.appspot.com/o/images%2Fpost%2Fmaquillaje1.png?alt=media&token=7da4b681-9e41-477e-b7ce-a6076d036718" alt="photo.png 6" /></Link>
        </div>
      </div>
    </div>
  );
};
