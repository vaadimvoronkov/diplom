import './App.css';
import Header from './components/Header/Header';
import * as React from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import HousePage from './pages/HousePage/HousePage';
import UnitPage from './pages/UnitPage/UnitPage';
import RoomPage from './pages/RoomPage/RoomPage';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/building/:buildingId/*" element={<BuildingPage />} />
      </Routes>
    </div>
  );
}

function BuildingPage() {
  const { buildingId } = useParams();

  return (
    <Routes>
      <Route path="/" element={<HousePage />} />
      <Route path="unit/:unitId/*" element={<RoomFunc />} />
    </Routes>
  );
}

function RoomFunc() {
  const { roomId } = useParams();

  return (
    <Routes>
      <Route path="/" element={<UnitPage />} />
      <Route path="/room/453" element={<RoomPage />} />
      <Route path="/room/451" element={<RoomPage />} />
      <Route path="/room/449" element={<RoomPage />} />
      <Route path="/room/447" element={<RoomPage />} />
      <Route path="/room/445" element={<RoomPage />} />
      <Route path="/room/443" element={<RoomPage />} />
      <Route path="/room/441" element={<RoomPage />} />
      <Route path="/room/441a" element={<RoomPage />} />
      <Route path="/room/450" element={<RoomPage />} />
      <Route path="/room/452" element={<RoomPage />} />
      <Route path="/room/454" element={<RoomPage />} />
      <Route path="/room/456" element={<RoomPage />} />
      <Route path="/room/458" element={<RoomPage />} />
      <Route path="/room/460" element={<RoomPage />} />
      <Route path="/room/462" element={<RoomPage />} />
      <Route path="/room/462a" element={<RoomPage />} />
      <Route path="/room/462b" element={<RoomPage />} />
      <Route path="/room/468" element={<RoomPage />} />
      <Route path="/room/466" element={<RoomPage />} />
      <Route path="/room/461" element={<RoomPage />} />
      <Route path="/room/459a" element={<RoomPage />} />
      <Route path="/room/457" element={<RoomPage />} />
      <Route path="/room/455a" element={<RoomPage />} />
      <Route path="/room/455" element={<RoomPage />} />
    </Routes>
  );
}

export default App;