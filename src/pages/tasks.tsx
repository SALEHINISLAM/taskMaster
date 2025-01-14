import { AddTaskModal } from "@/components/modules/tasks/addTask"
import TaskCard from "@/components/modules/tasks/taskCard"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { selectTasks, updateFilter } from "@/redux/features/tasks/taskSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hook"

export default function Tasks() {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  return (
    <div className="mx-auto max-w-7xl pt-5 mt-20 px-2">
      <div className="flex justify-end gap-5 flex-col md:flex-row">
        <h1 className="mr-auto">Tasks</h1>
        <Tabs defaultValue={"All"}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger onClick={() => dispatch(updateFilter("All"))} value="All">All</TabsTrigger>
            <TabsTrigger onClick={() => dispatch(updateFilter("High"))} value="High">High</TabsTrigger>
            <TabsTrigger onClick={() => dispatch(updateFilter("Medium"))} value="Medium">Medium</TabsTrigger>
            <TabsTrigger onClick={() => dispatch(updateFilter("Low"))} value="Low">Low</TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      <div className="">
      <Tabs defaultValue={"All"}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger onClick={() => dispatch(updateFilter("All"))} value="All">All</TabsTrigger>
            <TabsTrigger onClick={() => dispatch(updateFilter("High"))} value="High">High</TabsTrigger>
            <TabsTrigger onClick={() => dispatch(updateFilter("Medium"))} value="Medium">Medium</TabsTrigger>
            <TabsTrigger onClick={() => dispatch(updateFilter("Low"))} value="Low">Low</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-5 mt-5 px-1">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
