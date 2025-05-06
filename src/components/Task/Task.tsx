// import React from "react";
import { Todo } from "../../App";
import css from "./Task.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ({ task }: { task: Todo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
  } = useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

//   return (
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className={css.task} style={style}>
      <input
        type="checkbox"
        className={css.checkbox}
      />
      {task.title}
    </div>
  );
};
