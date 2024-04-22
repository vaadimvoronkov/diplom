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
  const [width, setWidth] = useState(50); // Ширина объекта по умолчанию
  const [height, setHeight] = useState(50); // Высота объекта по умолчанию
  const [roomId] = useState(1); // Задаем ID кабинета заранее

  const canvasRef = useRef(null); // Reference to the canvas element
  const [selectedObject, setSelectedObject] = useState(null); // Currently selected object
  const [dragging, setDragging] = useState(false); // State to track dragging
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset from mouse pointer to object position

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
        x: 200, // Starting coordinates inside the room
        y: 150,
        width,
        height,
        color,
        room: roomId
      });
      setData([...data, response.data]);
      setName('');
      setDescription('');
      setDate('');
      setWidth(50); // Reset width to default value
      setHeight(50); // Reset height to default value
      setColor('#000000'); // Reset color to default value
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

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/roomitems/roomitem/update/${id}/`, {
        name: selectedObject.name,
        description: selectedObject.description,
        date: selectedObject.date,
        width: selectedObject.width,
        height: selectedObject.height,
        color: selectedObject.color
      });
      const updatedData = data.map(item => (item.id === id ? selectedObject : item));
      setData(updatedData);
    } catch (error) {
      console.error('Ошибка при редактировании объекта:', error);
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let clickedItem = null;
    data.forEach(item => {
      const itemX = item.x;
      const itemY = item.y;

      if (
        mouseX >= itemX &&
        mouseX <= itemX + item.width &&
        mouseY >= itemY &&
        mouseY <= itemY + item.height
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
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw room
    ctx.fillStyle = 'gray';
    ctx.fillRect(200, 150, 800, 600);

    // Draw objects
    data.forEach(item => {
      ctx.fillStyle = item.color || 'blue';
      ctx.fillRect(item.x, item.y, item.width, item.height);
    });
  }, [data]);

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
                <td>
                  <button onClick={() => handleDelete(item.id)}>Удалить</button>
                  <button onClick={() => handleEdit(item.id)}>Редактировать</button>
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