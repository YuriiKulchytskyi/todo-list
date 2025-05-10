import { Task, Column as ColumnType } from "./types";
import { Column } from "./Column";
import { Active, DndContext, DragEndEvent, Over } from "@dnd-kit/core";
import { AddTaskForm } from "./components/AddTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, addTask, updateTask } from "./store/features/tasks/taskSlice";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks) || [];

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
    <main className="p-4 w-full h-full flex flex-col justify-center items-center">
      <div className="flex gap-8 h-full" >
        <AddTaskForm onAddTask={handleAddTask} />
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
    </main>
  );
}

export default App;
