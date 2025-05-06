// import React from 'react'
import css from "./Column.module.scss";
import { Todo } from "../../App";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../Task/Task";

export const Column = ({ tasks }: { tasks: Todo[] }) => {
  return (
    <div className={css.column}>
      <h2>Column</h2>
      <div>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
