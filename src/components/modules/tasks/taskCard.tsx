import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { openTaskModal } from '@/redux/features/modal/taskModalSlice'
import { deleteTask, toggleCompleteState } from '@/redux/features/tasks/taskSlice'
import { userName } from '@/redux/features/users/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ITask } from '@/type'
import { Edit, Trash2 } from 'lucide-react'

interface IProps {
    task: ITask
}

export default function TaskCard({ task }: IProps) {

    const dispatch = useAppDispatch()
    const assignedUser = useAppSelector((state) => userName(state, task.assignedTo))

    return (
        <div className={cn('border px-5 py-3 rounded-md hover:shadow-lg', {})}>
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className={cn("size-3 rounded-full", {
                        "bg-green-500": task.priority === "Low",
                        "bg-yellow-500": task.priority === "Medium",
                        "bg-red-500": task.priority === "High"
                    })}></div>
                    <h1 className={cn({ "line-through blur-sm": task.isCompleted === true })}>{task?.title}</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Edit className='cursor-pointer' size={16} onClick={() => { dispatch(openTaskModal(task)) }} />
                    <Button onClick={() => dispatch(deleteTask(task.id))} variant={"link"} className='p-0 text-red-500'>
                        <Trash2 />
                    </Button>
                    <Checkbox checked={task.isCompleted} onClick={() => dispatch(toggleCompleteState(task.id))} />
                </div>
            </div>
            <p className={cn('mt-5', { "blur-sm": task.isCompleted === true })}>{task?.description}</p>
            <p>Due Date: {new Date(task?.dueDate).toLocaleDateString('en-GB', { day: "2-digit", month: "short", year: "numeric" })}</p>
            <p>Assigned To: {assignedUser ? assignedUser.name : "Please assign a user"}</p>
        </div>
    )
}
