import "./ImagesButton.css";

function ImagesButton({ text, image, onClick }) {
  return (
    <button className="container-image-text" onClick={onClick}>
      <div className="image-container">
        <img
          className="imagen-cancha"
          src={image || "/placeholder.svg"}
          alt="icono"
        />
      </div>
      <p className="texto-paquete">{text}</p>
    </button>
  );
}

export default ImagesButton;
