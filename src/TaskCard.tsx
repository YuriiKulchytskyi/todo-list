import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import { useDispatch } from "react-redux";
import { deleteTask } from "./store/features/tasks/taskSlice";


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

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="rounded-lg bg-neutral-900 p-4 shadow-md"
      >
        <h3 className="text-lg font-semibold text-neutral-100">{task.title}</h3>
        <p className="text-neutral-400">{task.description}</p>
      </div>
      <button
        className="text-white px-2 py-1 absolute top-2 right-2 cursor-pointer w-10 h-10"
        onClick={() => {
          console.log("Deleting", task.id);
          dispatch(deleteTask(task.id));
        }}
      >
        X
      </button>
    </div>
  );
};
