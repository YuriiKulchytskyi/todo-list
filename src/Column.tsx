import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "./types";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}



export const Column = ({ column, tasks }: ColumnProps) => {
    const {setNodeRef} =useDroppable({
        id: column.id
    })
  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <div className="mb-4 text-lg w-full font-semibold text-neutral-100 flex justify-between">
        <h2>{column.title}</h2> <span>{tasks.length}</span>
      </div>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
