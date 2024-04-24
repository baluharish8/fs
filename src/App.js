import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from './App.router';
// import { HeaderComponent } from './components/header/header.component';
// import { HomeComponent } from './components/home/home.component';
// import { PracticeComponent } from './practice';

function App() {
  return (
    <div > 
      <BrowserRouter>
  <AppRouter></AppRouter>
{/* <PracticeComponent></PracticeComponent> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
