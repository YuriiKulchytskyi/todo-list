interface Props {
  id: string;
  task: string;
  priority: string;
}

export const TodoItem: React.FC<Props> = ({ task, priority }) => {
  return (
    <li>
      <p>{task}</p>
      <p>{priority}</p>
    </li>
  );
};
