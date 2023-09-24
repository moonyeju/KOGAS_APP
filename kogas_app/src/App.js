import {UserProvider} from './contexts/UserContext';
import Navigation from './navigations';

const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;
