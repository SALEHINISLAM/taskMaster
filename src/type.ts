export interface ITask{
    id:string,
    title:string,
    description:string,
    dueDate:number,
    isCompleted:boolean,
    priority:"High"|"Medium"|"Low",
    assignedTo:string
}

export interface IUser{
    name:string,
    id:string
}

export interface ITaskModalState{
    isModalOpen:boolean,
    currentTask?:ITask | null
}

export interface IUserModalState{
    isUserModalOpen:boolean,
    currentUser:IUser |null
}