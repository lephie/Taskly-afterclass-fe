import http from "@/utils/http"
import {type DeleteTaskResponse, type CreateTaskResponse, type ListTaskResponse, type Task} from "@/types/task"


export const ListTaskService = async (): Promise<Task[]> => {
    const {data} = await http.get<ListTaskResponse>("/task");
    return data.data;
}

export const createTaskService = async (task: Task): Promise<boolean> => {
    const {data} = await http.post<CreateTaskResponse>("/task", {
        title: task.title,
        desc: task.desc,
        label: task.label,
    });
    return data.success;
}

export const DeleteTaskService = async(id: string): Promise<boolean> =>{
    const {data} = await http.delete<DeleteTaskResponse>(`/task/${id}`);
    return data.success;
}