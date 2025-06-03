import logo from './logo.svg';
import './App.css';
import GorodValves from './components/GorodValve';
import CODMapContainer from './components/CODMapContainer';
import BombMap from './components/BombMap';

function App() {
  return (
    <div>
      <GorodValves></GorodValves>
      <BombMap></BombMap>
      <CODMapContainer></CODMapContainer>
    </div>
  );
}

export default App;
