import { useState } from "react";
// import css from "./App.module.scss";
import { Task, Column as ColumnType } from "./types";
import { Column } from "./Column";
import { Active, DndContext, DragEndEvent, Over } from "@dnd-kit/core";
import { AddTaskForm } from "./components/AddTaskForm";
//

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over }: { active: Active; over: Over | null } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
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
