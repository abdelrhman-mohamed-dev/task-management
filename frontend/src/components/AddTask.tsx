import { useState } from "react";
import { Button } from "./ui/button";
import { AddTaskModal } from "./add-task-modal";

const AddTask = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddTaskModal
        title="Add Task"
        description="Add a new Task to manage Your Month!"
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Button
        variant="outline"
        className="ml-2"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Task
      </Button>
    </>
  );
};

export default AddTask;
