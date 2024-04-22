import './RoomPage.css';
import Scheme from '../../components/RoomScheme/RoomScheme';
import GetData from '../../components/RestElement/RestElement';

export default function RoomPage() {
  return (
    <main>
      <div className="description">
        <h2 className='title'><b>Факультет бизнес-информатики</b></h2>
			  <p className='title_p'>Кабинет 453</p>
      </div>
      <div className='interactive'>
        <GetData></GetData>
      </div>
    </main>
  );
} 