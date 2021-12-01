export default function AppButton({ onButtonClick = null, buttonText = '' }) {
  return (
    <div className="button">
      <span onClick={onButtonClick}>{buttonText}</span>
    </div>
  );
}
