import "./ImagesButton.css"

function ImagesButton({ text, image, onClick }) {
  return (
    <button className="container-image-text" onClick={onClick}>
      <div className="image-wrapper">
        <img className="imagen-cancha" src={image || "/placeholder.svg"} alt="cancha padel" />
        <div className="overlay"></div>
      </div>
      <p className="texto-paquete">{text}</p>
    </button>
  )
}

export default ImagesButton

