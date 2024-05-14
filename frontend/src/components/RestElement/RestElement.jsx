import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './RestElement.css';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [roomId] = useState(1);
  const [price, setPrice] = useState(0);
  const [inventory_number, setInventory_number] = useState();

  const canvasRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredObject, setHoveredObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/roomitems/all/');
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleAddObject = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/roomitems/roomitem/create/', {
        name,
        description,
        date,
        x: 200,
        y: 150,
        width,
        height,
        color,
        price,
        inventory_number,
        room: roomId
      });
      setData([...data, response.data]);
      setName('');
      setDescription('');
      setDate('');
      setWidth(0);
      setHeight(0);
      setPrice(0);
      setInventory_number('');
      setColor('#000000');
      handlePopupClose();
    } catch (error) {
      console.error('Ошибка при добавлении объекта:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/roomitems/roomitem/delete/${id}/`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении объекта:', error);
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let clickedItem = null;
    data.forEach(item => {
      if (
        mouseX >= item.x &&
        mouseX <= item.x + item.width &&
        mouseY >= item.y &&
        mouseY <= item.y + item.height
      ) {
        clickedItem = item;
      }
    });

    if (clickedItem) {
      setDragging(true);
      setSelectedObject(clickedItem);
      setOffset({ x: mouseX - clickedItem.x, y: mouseY - clickedItem.y });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging && selectedObject) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - offset.x;
      const newY = mouseY - offset.y;
      if (newX >= 200 && newY >= 150 && newX + selectedObject.width <= 1000 && newY + selectedObject.height <= 750) {
        selectedObject.x = newX;
        selectedObject.y = newY;

        setData([...data]);
      }
    } else {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let hoveredItem = null;
      data.forEach(item => {
        if (
          mouseX >= item.x &&
          mouseX <= item.x + item.width &&
          mouseY >= item.y &&
          mouseY <= item.y + item.height
        ) {
          hoveredItem = item;
        }
      });

      setHoveredObject(hoveredItem);
    }
  };const handleMouseUp = async () => {
    if (dragging && selectedObject) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/roomitems/roomitem/update/${selectedObject.id}/`, {
          name: selectedObject.name,
          description: selectedObject.description,
          date: selectedObject.date,
          width: selectedObject.width,
          height: selectedObject.height,
          color: selectedObject.color,
          x: selectedObject.x,
          y: selectedObject.y,
          price: selectedObject.price,
          inventory_number: selectedObject.inventory_number,
        });
        const updatedData = data.map(item => (item.id === selectedObject.id ? selectedObject : item));
        setData(updatedData);
      } catch (error) {
        console.error('Ошибка при редактировании объекта:', error);
      }
    }
    setDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'gray';
    ctx.fillRect(200, 150, 800, 600);

    data.forEach(item => {
      ctx.fillStyle = item.color || 'blue';
      ctx.fillRect(item.x, item.y, item.width, item.height);
    });

    if (hoveredObject) {
      ctx.fillStyle = 'black';
      ctx.fillText(`ID: ${hoveredObject.id}, ${hoveredObject.date}`, hoveredObject.x, hoveredObject.y - 65);
      ctx.fillText(`${hoveredObject.name}`, hoveredObject.x, hoveredObject.y - 50);
      ctx.fillText(`${hoveredObject.description}`, hoveredObject.x, hoveredObject.y - 35);
      ctx.fillText(`Стоимость: ${hoveredObject.price}`, hoveredObject.x, hoveredObject.y - 20);
      ctx.fillText(`Инвентаризационный номер: ${hoveredObject.inventory_number}`, hoveredObject.x, hoveredObject.y - 5);
    }
  }, [data, hoveredObject]);

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddObject();
              }}>
              <label>
                Название:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                Описание:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <label>
                Стоимость:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
              <label>
              <label>
                Инвентаризационный номер:
                <input type="text" value={inventory_number} onChange={(e) => setInventory_number(e.target.value)} />
              </label>
                Дата добавления:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label>
                Ширина:
                <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} />
              </label>
              <label>
                Высота:
                <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} />
              </label>
              <label>
                Цвет:
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
              </label>
              <button type="submit">Добавить</button>
            </form>
            <button onClick={handlePopupClose}>Закрыть</button>
          </div>
        </div>
      )}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={1200}
          height={900}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
      <div className="button-container">
        <button onClick={handleAdd}>Добавить объект</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Дата добавления</th>
              <th>Цена</th>
              <th>Инвентаризационный номер</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.inventory_number}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyComponent;