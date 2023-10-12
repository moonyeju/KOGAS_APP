import {UserProvider} from './contexts/UserContext';
import Navigation from './navigations';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;
