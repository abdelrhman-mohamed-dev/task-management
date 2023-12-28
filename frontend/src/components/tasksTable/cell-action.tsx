import { Edit, MoreHorizontal } from "lucide-react";
import { Copy } from "lucide-react";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/alert-modal";
import { Task } from "./columns";
import { EditTaskModal } from "../edit-task-modal";
import api from "@/api/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface CellActionProps {
  data: Task;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [open, setOpen] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onCopy = () => {
    api
      .put(
        `/tasks/${data.id}`,
        {
          isCompleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success("Task Done.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      api
        .delete(`/tasks/${data.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          toast.success("Task Deleted.");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      toast.error("Some thing wen Wrong pls try agian.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        loading={isLoading}
        onConfirm={onDelete}
      />
      <EditTaskModal
        taskId={data.id}
        title="Edit Task"
        description="Edit Your Task!"
        isOpen={openForEdit}
        onClose={() => {
          setOpenForEdit(false);
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Mark as Done
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenForEdit(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
            className="bg-red-600 text-white focus:bg-accent focus:bg-red-600 focus:text-white"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
