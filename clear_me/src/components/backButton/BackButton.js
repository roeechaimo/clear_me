import { useNavigate } from 'react-router-dom';

export default function BackButton({}) {
  const navigate = useNavigate();

  return (
    <div className="nav-wrapper">
      <div className="button">
        <span onClick={() => navigate(-1)}>Back</span>
      </div>
    </div>
  );
}
