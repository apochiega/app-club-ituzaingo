import './DecreaseMatchCountButton.css';

function DecreaseMatchCountButton({ memberNumber, onDecrement }) {

  return (
    <button 
      className="decrease-button"
      onClick={() => onDecrement(memberNumber)}
    >
      -1 Partido
    </button>
  );
}
export default DecreaseMatchCountButton;