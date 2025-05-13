import { useDispatch, useSelector } from "react-redux";
import { addTask, selectTasksByProject, updateTask } from "../../store/features/tasks/taskSlice";
import { Task, Column as ColumnType } from "../../types";
import { Active, DndContext, DragEndEvent, Over } from "@dnd-kit/core";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { Column } from "./Column";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";



const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const tasks = useSelector(selectTasksByProject(projectId || null));

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    dispatch(addTask(task));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over }: { active: Active; over: Over | null } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    dispatch(updateTask({ id: taskId, status: newStatus }));
  }

  return (
    <div className="relative">
      <div 
        className="absolute top-0 left-0 w-10 h-10 text-black rounded-full flex items-center justify-center cursor-pointer" 
        onClick={() => navigate("/")}
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </div>
      <div className="p-4 w-full h-full flex flex-col justify-center items-center">
        <div className="flex gap-8 h-full">
          <AddTaskForm onAddTask={handleAddTask} projectId={projectId || null} />
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </DndContext>
        </div>
      </div>
    </div>
  );
};
