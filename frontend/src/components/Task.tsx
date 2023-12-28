// components/Task.tsx
import React, { useState } from "react";

interface TaskProps {
  title: string;
  description: string;
  date: string;
}

const Task: React.FC<TaskProps> = ({ title, description, date }) => {
  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  return (
    <div
      className={`flex items-center mb-4 ${completed ? "line-through" : ""}`}
    >
      <input
        type="checkbox"
        className="mr-2"
        checked={completed}
        onChange={handleCheckboxChange}
      />
      <div className="task-details flex justify-between items-center ">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-500">Date: {date}</p>
      </div>
    </div>
  );
};

export default Task;
