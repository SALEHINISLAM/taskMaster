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
import Swal from "sweetalert2";

interface IProps {
    task: ITask;
}

export default function TaskCard({ task }: IProps) {
    const dispatch = useAppDispatch();
    const assignedUser = useAppSelector((state) =>
        userName(state, task.assignedTo)
    );

    const [isDeleted, setIsDeleted] = useState(false);
    const [isTaskCompletedLocal,setIsTaskCompletedLocal]=useState(task.isCompleted)

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
                setIsDeleted(true);
            }
        }).then(() =>
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                timer: 1000,
            })
        );
    };

    const handleTaskCompletion = (id: string) => {
        setIsTaskCompletedLocal(!isTaskCompletedLocal)
        setTimeout(() => {
            dispatch(toggleCompleteState(id))
        }, 1000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isDeleted ? { opacity: 0, y: -20, rotate: 20 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layout
            className={cn(
                "border px-5 py-3 rounded-md hover:shadow-lg",
                {

                }
            )}
        >
            <motion.div
                className="flex items-center justify-between"
                animate={{
                    //scale: task.isCompleted ? 1.05 : 1,
                    rotate: isTaskCompletedLocal ? -1 : 0,
                }}
                transition={{ duration: 3 }}
            >
                <div className="flex gap-2 items-center">
                    <motion.div
                        className={cn("size-3 rounded-full", {
                            "bg-green-500": task.priority === "Low",
                            "bg-yellow-500": task.priority === "Medium",
                            "bg-red-500": task.priority === "High",
                        })}
                        animate={{
                            scale: task.isCompleted ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                    ></motion.div>
                    <motion.h1
                        layout
                        className={cn({
                            "line-through": isTaskCompletedLocal === true,
                        })}
                        animate={{
                            opacity: isTaskCompletedLocal ? 0.6 : 1,
                            x: isTaskCompletedLocal ? 10 : 0,
                        }}
                        transition={{ duration: 0.3 }}
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
                        checked={isTaskCompletedLocal}
                        onClick={() =>handleTaskCompletion(task.id)}
                    />
                </div>
            </motion.div>

            <motion.p
                layout
                className={cn("mt-5", {
                    "line-through": isTaskCompletedLocal === true
                })}
                animate={{
                    opacity: isTaskCompletedLocal ? 0.5 : 1,
                    x: isTaskCompletedLocal ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                {task?.description}
            </motion.p>
            <motion.p
                layout
                className={cn("mt-5", {
                    "line-through": isTaskCompletedLocal === true
                })}
                animate={{
                    opacity: isTaskCompletedLocal ? 0.5 : 1,
                    x: isTaskCompletedLocal ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                Due Date:{" "}
                {new Date(task?.dueDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </motion.p>
            <motion.p
                className={cn("mt-5", {
                    "line-through": isTaskCompletedLocal === true
                })}
                animate={{
                    opacity: isTaskCompletedLocal ? 0.5 : 1,
                    x: isTaskCompletedLocal ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                Assigned To:{" "}
                {assignedUser ? assignedUser.name : "Please assign a user"}
            </motion.p>
        </motion.div>
    );
}