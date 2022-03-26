import SignupPage from './pages/signupPage/SignupPage';
import MainPage from './pages/mainPage/MainPage';
import { useSelector } from 'react-redux';

function App() {
  const userLoggedin = useSelector(state => state.loggedin);

  return (
    <div className="App">
      {
        userLoggedin ?
        <MainPage /> :
        <SignupPage />
      }
    </div>
  );
}

export default App;
