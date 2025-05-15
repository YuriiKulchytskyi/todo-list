import { useDraggable } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { Task } from "../../types";
import { deleteTask, updateTask } from "../../store/features/tasks/taskSlice";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const handleTaskStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const direction = e.currentTarget.dataset.direction;
    const status = e.currentTarget.dataset.status;

    if (!status || !direction) return;

    let newStatus: Task["status"] | null = null;

    if (direction === "forward") {
      if (status === "TODO") newStatus = "IN_PROGRESS";
      else if (status === "IN_PROGRESS") newStatus = "DONE";
    }

    if (direction === "back") {
      if (status === "DONE") newStatus = "IN_PROGRESS";
      else if (status === "IN_PROGRESS") newStatus = "TODO";
    }

    if (newStatus) {
      // TODO: dispatch action to update task status
      console.log(`Changing status of ${task.id} to ${newStatus}`);
      dispatch(updateTask({ id: task.id, status: newStatus }));
    }
  };

  return (
    <div className="relative box-sizing: border-box">
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-lg bg-pink-300 p-4 shadow-md relative group"
      >
        
        <div
          {...attributes}
          {...listeners}
          className="hidden group-hover:block text-xs text-gray-700 mb-1 translate-x-1/2 sm:hidden md:hidden"
        >
          Drag me
        </div>

        <div className="flex justify-evenly items-center">
          <h3 className="text-black font-semibold text-neutral-700">
            {task.title}
          </h3>
        </div>

        <p className="text-neutral-600">{task.description}</p>

        <div className="flex gap-2 md:hidden w-4">
          <button
            data-direction="back"
            data-status={task.status}
            onClick={handleTaskStatus}
            className="text-black px-2 py-1 cursor-pointer absolute top-0 left-0 w-10 h-10 hover:bg-pink-400"
          >
            <ArrowLeftIcon />
          </button>
          <button
            data-direction="forward"
            data-status={task.status}
            onClick={handleTaskStatus}
            className="text-black px-2 py-1 cursor-pointer absolute top-0 right-0 w-10 h-10 hover:bg-pink-400"
          >
            <ArrowRightIcon />
          </button>
        </div>
        <button
          className="text-black px-2 py-1 absolute top-2 right-2 cursor-pointer w-10 h-10"
          onClick={() => dispatch(deleteTask(task.id))}
        >
          X
        </button>

      </div>
    </div>
  );
};
