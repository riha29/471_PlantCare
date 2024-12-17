import React, { createContext, useState, useEffect } from "react";

export const PlantScheduleContext = createContext();

const PlantScheduleProvider = ({ children }) => {
  const [plantSchedules, setPlantSchedules] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load schedules from local storage
  useEffect(() => {
    const storedSchedules = JSON.parse(localStorage.getItem("plantSchedules")) || [];
    setPlantSchedules(storedSchedules);
    generateNotifications(storedSchedules);
  }, []);

  // Save schedules to local storage
  useEffect(() => {
    localStorage.setItem("plantSchedules", JSON.stringify(plantSchedules));
    generateNotifications(plantSchedules);
  }, [plantSchedules]);

  // Generate notifications based on today's date
  const generateNotifications = (schedules) => {
    const today = new Date().toISOString().split("T")[0];
    const upcoming = schedules.filter((schedule) => schedule.date === today);
    setNotifications(upcoming);
  };

  const addPlantSchedule = (schedule) => {
    setPlantSchedules((prev) => [...prev, schedule]);
  };

  return (
    <PlantScheduleContext.Provider value={{ plantSchedules, addPlantSchedule, notifications }}>
      {children}
    </PlantScheduleContext.Provider>
  );
};

export default PlantScheduleProvider;
