interface ActionButtonProps {
  icon: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick }) => {
  return (
    <button onClick={onClick} className="button is-primary is-small is-square">
      <span className="icon">
        <i className={`fas ${icon}`} />
      </span>
    </button>
  );
};

export default ActionButton;
