import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TodoItem } from "../TodoItem/TodoItem";

interface Task {
    id: string;
    task: string;
    priority: string;
}

export const TodoList: React.FC = () => {
    const list = useSelector((state: RootState) => state.tasks.tasks);

    return (
        <ul>
            {list.map((task: Task) => (
                <TodoItem key={`task-${task.id}`} id={task.id} task={task.task} priority={task.priority} />
            ))}
        </ul>
    );
};
