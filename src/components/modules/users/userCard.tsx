import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { openUserModal } from '@/redux/features/modal/userModalSlice'
import { isUserDeleted, removeUser, selectPendingTasksByUser } from '@/redux/features/users/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { IUser } from '@/type'
import { Edit, Trash, User2 } from 'lucide-react'
import { FcSerialTasks } from 'react-icons/fc'
import TaskCard from '../tasks/taskCard'
import Swal from 'sweetalert2'
import { store } from '@/redux/store'

interface IProps {
    user: IUser
}

export default function UserCard({ user }: IProps) {

    const dispatch = useAppDispatch()

    const pendingTask = useAppSelector((state) => selectPendingTasksByUser(state, user.id))
    const handleDeleteUser = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "After deleting, you won't be able to revert this!",
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
                dispatch(removeUser(id));
                if (!isUserDeleted(store.getState(), user.id)) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success",
                        timer: 1000,
                    });
                }
                else {
                    Swal.fire({
                        title: "Last user can't be deleted",
                        text: "There must be one user",
                        icon: "warning",
                        timer: 1000,
                    })
                }
            }
        });
    };

    return (
        <div className={cn('border px-5 py-3 rounded-md hover:shadow-lg', {})}>
            <User2 />
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className='text-pretty text-2xl'>{user?.name}</h1>
                    <p>Pending Task: {pendingTask.length} </p>
                </div><div className="flex gap-3 items-center">
                    <Edit className='cursor-pointer' size={16} onClick={() => { dispatch(openUserModal(user)) }} />
                    <Button onClick={() => handleDeleteUser(user.id)} variant={"link"} className='p-0 text-red-500'>
                        <Trash />
                    </Button>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Show More</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>All Pending Task of {user.name}</DialogTitle>
                        <DialogDescription>
                            See all the pending task. <FcSerialTasks className='inline' />
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 mt-5 px-1">
                        {pendingTask?.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
