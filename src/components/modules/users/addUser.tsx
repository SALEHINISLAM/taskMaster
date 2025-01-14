import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { closeUserModal, openUserModal } from "@/redux/features/modal/userModalSlice";
import { addUser } from "@/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddUserModal() {

    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.userModal.isUserModalOpen)
    const user = useAppSelector((state) => state.userModal.currentUser)

    const form = useForm({
        defaultValues: {
            name: '',
        },
        mode: "onBlur"
    })

    useEffect(() => {
        if (user) {
            form.reset({
                name: user?.name || "",
            })
        } else {
            form.reset({
                name: "Md. Salehin Islam"
            })
        }
    }, [form, user])

    const onSubmit = (data: any) => {
        console.log(data)
        const formattedTask = {
            ...data, id: user?.id
        }
        dispatch(addUser(formattedTask))
        dispatch(closeUserModal())
        form.reset()
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(closeUserModal())}>
            <Button variant={"outline"} onClick={() => dispatch(openUserModal(null))}>Add User<User /></Button>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Create a new task by providing the necessary details. Fill out the fields below and click "Save Changes" to add it to your task list.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* name */}
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters long."
                                }
                            }}
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel >Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription className="flex items-center gap-1">Write a name of user <User size={14} /></FormDescription>
                                    <FormMessage >{form.formState.errors.name?.message}</FormMessage>
                                </FormItem >
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" className="mt-5">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
