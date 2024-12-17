import React, { useContext } from "react";
import { PlantScheduleContext } from "../context/PlantScheduleContext";

const Notifications = () => {
  const { plantSchedules } = useContext(PlantScheduleContext);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks scheduled for today
  const todayTasks = plantSchedules.filter((task) => task.date === today);

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
      <h3 className="font-bold">Today's Activities</h3>
      {todayTasks.length > 0 ? (
        todayTasks.map((task, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>{task.plantName}:</strong> {task.activity}
            </p>
          </div>
        ))
      ) : (
        <p>No activities scheduled for today.</p>
      )}
    </div>
  );
};

export default Notifications;
