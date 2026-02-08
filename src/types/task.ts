export type Task ={
    id?: string;
    userId?: string;
    title: string;
    desc: string;
    label: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ListTaskResponse ={
    data: Task[];
    success: boolean;
    message: string;
    pagination: {
        total: number;
        totalPage: number;
        page: number;
        limit: number;
    }
}

export type CreateTaskResponse ={
    data: Task;
    success: boolean;
    message: string
}

export type DeleteTaskResponse = CreateTaskResponse;