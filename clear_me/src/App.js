import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Clients from './containers/clients/Clinets';
import Map from './containers/map/Map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clients />}></Route>

        <Route path="map" element={<Map />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
