import React, { useState } from 'react';
import { Calendar } from 'react-calendar-kit';
import 'react-calendar-kit/dist/styles.css';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleReservation = () => {
    if (selectedDate && selectedTime) {
      alert(`Reserva realizada para el ${selectedDate.toLocaleDateString()} a las ${selectedTime}`);
    } else {
      alert('Por favor, seleccione una fecha y una horaaaaaa.');
  }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour += 1.5) {
      const time = new Date();
      time.setHours(hour, (hour % 1) * 60, 0, 0);
      slots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    return slots;
  };

  return (
    <div>
      <h1>Calendario de Reservas</h1>
      <Calendar onChange={handleDateChange} />
      {selectedDate && (
        <div>
          <h2>Seleccione una hora</h2>
          <select value={selectedTime} onChange={handleTimeChange}>
            <option value="">Seleccione una hora</option>
            {generateTimeSlots().map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      )}
      <button onClick={handleReservation}>Reservar</button>
    </div>
  );
};

export default MyCalendar;