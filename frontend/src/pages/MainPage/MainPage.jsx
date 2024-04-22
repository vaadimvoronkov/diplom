import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import house from '../../img/sgups.jpg';
import house1 from '../../img/orig.jpg';

export default function MainPage() {
  return (
    <main>
      <div className="houses">
        <h2><b>Выберите помещение:</b></h2>
        <div className="houses_wrapper">
          <div className="house_section">
            <Link to="/building/1" style={{ textDecoration: 'none', color: 'black' }}>
              <img src={house} alt="" className="image_house_section" />
              <h3>СГУПС</h3>
              <p className="house_description">Главный корпус университета</p>
            </Link>
          </div>
          <div className="house_section">
            <Link to="/building" style={{ textDecoration: 'none' , color: 'black'}}>
              <img src={house1} alt="" className="image_house_section" />
              <h3>СГУПС</h3>
              <p className="house_description">Лабораторный корпус университета</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}