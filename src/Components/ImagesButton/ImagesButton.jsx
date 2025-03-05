import "./ImagesButton.css"

function ImagesButton({ text, image, onClick, fontSize }) {
  return (
    <button className="container-image-text" onClick={onClick}>
      <div className="image-wrapper">
        <img className="imagen-cancha" src={image || "/placeholder.svg"} alt="cancha padel" />
        <div className="overlay"></div>
      </div>
      <p className="texto-paquete" style={{ fontSize: fontSize }}>
        {text}
      </p>
    </button>
  )
}

export default ImagesButton
