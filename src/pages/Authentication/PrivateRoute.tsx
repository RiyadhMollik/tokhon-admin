import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      
    } else {
      navigate('/'); // Redirect to root if token does not exist
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
