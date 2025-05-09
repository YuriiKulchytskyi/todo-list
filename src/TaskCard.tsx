import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  } : undefined

  return (
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
  );
};
