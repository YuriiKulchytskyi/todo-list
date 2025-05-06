import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import css from "./App.module.scss";
import { useState } from "react";
import { Column } from "./components/Column/Column";
// import { move } from 'formik'
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Input } from "./components/Input/Input";
// import { TodoForm } from './components/TodoForm/TodoForm'
// import { TodoList } from './components/TodoList/TodoList'
//

export interface Todo {
  id: string;
  title: string;
  completed?: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Todo[]>([
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
    { id: "3", title: "Task 3" },
  ]);

  const addTasks = (title: string) => {
    setTasks((tasks) => [...tasks, { id: `${tasks.length + 1}`, title }]);
  };


  const getTaskPos = (id: string) => {
    return tasks.findIndex((task) => task.id === id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(TouchSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
)




  return (
    <div className={css.App}>
      <h1>Todo List</h1>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>
      <Input onSubmit={addTasks} />
    </div>
  );
}

export default App;
