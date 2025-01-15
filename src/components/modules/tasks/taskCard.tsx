import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { openTaskModal } from '@/redux/features/modal/taskModalSlice';
import { deleteTask, toggleCompleteState } from '@/redux/features/tasks/taskSlice';
import { userName } from '@/redux/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ITask } from '@/type';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Swal from "sweetalert2"


interface IProps {
    task: ITask
}

export default function TaskCard({ task }: IProps) {
    const dispatch = useAppDispatch();
    const assignedUser = useAppSelector((state) =>
        userName(state, task.assignedTo)
    );

    const [isDeleted, setIsDeleted] = useState(false)

    const handleDeleteTask = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "After deleted you won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!",
            showClass: {
                popup: `animate__animated animate__fadeInUp animate__faster`,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTask(id));
                setIsDeleted(true)
            }
        }).then(()=>
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                timer:1000
            })
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isDeleted?{ opacity: 1, y: 200,rotate:20 }:{opacity:1,y:0}}
            exit={{ opacity: 0 }}
            transition={{duration:1}}
            layout
            className="border px-5 py-3 rounded-md hover:shadow-lg"
        >
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div
                        className={cn("size-3 rounded-full", {
                            "bg-green-500": task.priority === "Low",
                            "bg-yellow-500": task.priority === "Medium",
                            "bg-red-500": task.priority === "High",
                        })}
                    ></div>
                    <motion.h1
                        layout
                        className={cn({
                            "line-through blur-sm": task.isCompleted === true,
                        })}
                    >
                        {task?.title}
                    </motion.h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Edit
                        className="cursor-pointer"
                        size={16}
                        onClick={() => {
                            dispatch(openTaskModal(task));
                        }}
                    />
                    <Button
                        onClick={() => handleDeleteTask(task.id)}
                        variant={"link"}
                        className="p-0 text-red-500"
                    >
                        <Trash2 onClick={() => handleDeleteTask(task.id)} />
                    </Button>
                    <Checkbox
                        checked={task.isCompleted}
                        onClick={() =>
                            dispatch(toggleCompleteState(task.id))
                        }
                    />
                </div>
            </div>

            <motion.p
                layout
                className={cn("mt-5", {
                    "blur-sm": task.isCompleted === true,
                })}
            >
                {task?.description}
            </motion.p>
            <p>
                Due Date:{" "}
                {new Date(task?.dueDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
            <p>
                Assigned To:{" "}
                {assignedUser ? assignedUser.name : "Please assign a user"}
            </p>
        </motion.div>
    );
}