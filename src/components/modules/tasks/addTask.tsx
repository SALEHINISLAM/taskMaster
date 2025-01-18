import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { closeTaskModal, openTaskModal } from "@/redux/features/modal/taskModalSlice"
import { addTask } from "@/redux/features/tasks/taskSlice"
import { selectUsers } from "@/redux/features/users/userSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { format } from "date-fns"
import { ArrowUpNarrowWide, CalendarDays, CalendarIcon, CircleCheckBig, User, Watch } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";

export function AddTaskModal() {

  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.taskModal.isModalOpen)
  const task = useAppSelector((state) => state.taskModal.currentTask)
  const users=useAppSelector(selectUsers)
  const defaultUserId=users[0]?.id
  //console.log(task)
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: "",
      assignedTo: "",
      dueDate: new Date()
    },
    mode: "onBlur"
  })

  useEffect(() => {
    if (task) {
      form.reset({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "",
        assignedTo: task?.assignedTo || "",
        dueDate: new Date(task?.dueDate) || new Date(),
      })
    } else {
      form.reset({
        title: "Design and Implement the Home Page",
        description: "Build the main landing page with a user-friendly layout, navigation, and clear call-to-action elements.",
        priority: "High",
        assignedTo: defaultUserId,
        dueDate: new Date(),
      })
    }
  }, [form, task])

  const allUsers = useAppSelector(selectUsers)

  const onSubmit = (data: any) => {
    console.log(data)
    const formattedTask = {
      ...data, dueDate: new Date(data.dueDate), id: task?.id
    }
    dispatch(addTask(formattedTask))
    dispatch(closeTaskModal())
    form.reset()
  }

  const previousDate = new Date()
  previousDate.setDate(previousDate.getDate() - 1)

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeTaskModal())}>
      <Button variant="outline" onClick={() => dispatch(openTaskModal(null))}>Add New Task<Watch /> </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Create a new task by providing the necessary details. Fill out the fields below and click "Save Changes" to add it to your task list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Task title is required",
                minLength: {
                  value: 3,
                  message: "Task title must be at least 3 characters long."
                }
              }}
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel >Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">Write a suitable title for your task <CircleCheckBig size={14} /></FormDescription>
                  <FormMessage >{form.formState.errors.title?.message}</FormMessage>
                </FormItem >
              )}
            />
            {/* description */}
            <FormField
              control={form.control}
              name="description"
              rules={{
                required: "Description of a task is required",
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters long."
                }
              }}
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel >Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1">Write short description for your task <CircleCheckBig size={14} /></FormDescription>
                  <FormMessage >{form.formState.errors.description?.message}</FormMessage>
                </FormItem >
              )}
            />
            {/* select priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn({ "bg-red-300": field.value === "High", "bg-yellow-200": field.value === "Medium", "bg-green-200": field.value === "Low" })}>
                        <SelectValue placeholder="Set priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="High" className="uppercase text-red-500 flex gap-5 items-center flex-row">HIGH<FcHighPriority className="inline" /></SelectItem>
                      <SelectItem value="Medium" className="uppercase text-yellow-500 flex gap-5 items-center flex-row">MEDIUM<FcMediumPriority className="inline" /></SelectItem>
                      <SelectItem value="Low" className="uppercase text-green-500 flex gap-5 items-center flex-row">LOW<FcLowPriority className="inline" /></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="flex items-center gap-1">
                    Prioritize your task. <ArrowUpNarrowWide size={14} />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* select user */}
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned User</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Assigned to" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        allUsers.map(user =>
                          <SelectItem value={user.id} key={user.id}>
                            {user.name}
                          </SelectItem>
                        )
                      }

                    </SelectContent>
                  </Select>
                  <FormDescription className="flex items-center gap-1">
                    Assign a user for the task. <User size={14} />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* due date */}
            <FormField
              control={form.control}
              name="dueDate"
              rules={{
                required: "Please Select due Date"
              }}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < previousDate
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-1">
                    Add due date as reminder. <CalendarDays size={14} />
                  </FormDescription>
                  <FormMessage >{form.formState.errors.dueDate?.message}</FormMessage>
                </FormItem>
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
