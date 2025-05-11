export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
    id: string;
    status: TaskStatus;
    title: string;
    description: string;
    projectId: string | null;
}

export type Column = {
    id: Task["status"];
    title: string
}