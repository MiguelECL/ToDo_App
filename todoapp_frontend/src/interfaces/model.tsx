export interface ToDo{
    id: number,
    name: string,
    dueDate?: string,
    doneFlag: boolean,
    doneDate?: number,
    priority: "High" | "Medium" | "Low"
    creationDate: string
}