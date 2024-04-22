import './HousePage.css'
import house from '../../img/sgups2.jpg'
import FloorElement from '../../components/FloorElement/FloorElement';
import LocationElement from '../../components/LocationElement/LocationElement';
import { Link } from 'react-router-dom';
export default function HousePage(){
	return (
		<main className="house_plan">
				<div className="house_img_block">
					<img src={house} alt="" className="img_block"/>
				</div>
				<h3 className="h_margin"><b>СГУПС: Главный Корпус</b></h3>
				<LocationElement name={"СГУПС: Главный Корпус"} address={"ул. Дуси Ковальчук, 191, Новосибирск, Новосибирская обл."} ></LocationElement>
				<h3 className="h_margin"><b>Этажи:</b></h3>
				<div className="floors_block">
					<FloorElement>Этаж 0</FloorElement>
					<FloorElement>Этаж 1</FloorElement>
					<FloorElement>Этаж 2</FloorElement>
					<FloorElement>Этаж 3</FloorElement>
					<FloorElement>Этаж 4</FloorElement>
				</div>
				<h3 class="h_margin"><b>Факультеты:</b></h3>
				<div class="floors_block">
					<FloorElement>СЖД</FloorElement>
					<FloorElement>МТ</FloorElement>
					<FloorElement>ПГС</FloorElement>
					<FloorElement>МЭИП</FloorElement>
					<FloorElement>УТТК</FloorElement>
					<FloorElement>УПП</FloorElement>
					<FloorElement>ИЭФ</FloorElement>
					<Link to="/building/1/unit/1" style={{ textDecoration: 'none', color: 'black' }}>
						<FloorElement>ФБИ</FloorElement>
					</Link>
				</div>
				<div>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
				</div>
		</main>
	)
}