import AddUserModal from "@/components/modules/users/addUser";
import UserCard from "@/components/modules/users/userCard";
import { selectUsers } from "@/redux/features/users/userSlice";
import { useAppSelector } from "@/redux/hook";

export default function Users() {
  const users=useAppSelector(selectUsers)
  return (
    <div className="mx-auto max-w-7xl pt-5 mt-20 px-2">
      <div className="flex justify-end gap-5 flex-col md:flex-row">
        <h1 className="mr-auto">Users</h1>
        <AddUserModal />
      </div>
      <div className="space-y-5 mt-5 px-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
