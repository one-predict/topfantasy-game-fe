import { Navigate } from 'react-router';
import AppSection from '@enums/AppSection';

export const handle = {
  appSection: AppSection.Home,
};

const HomePage = () => {
  return <Navigate to="/tournaments" />;
};

export default HomePage;
