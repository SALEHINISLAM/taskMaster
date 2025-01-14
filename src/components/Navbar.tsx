import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
export default function Navbar() {
    return (
        <nav className='max-w-7xl mx-auto pt-5 h-16 flex items-center gap-3 px-5'>
            <div className="flex flex-col items-center">
                <img src="https://i.ibb.co.com/n1fBj81/icons8-task.gif" alt="" />
                <br />
                <div className="-mt-8">
                <span className='font-bold ml-2'>{`Task `}</span> Master
                </div>
            </div>
            <Link to={'/'} className="uppercase">tasks</Link>
            <Link to={'/users'} className="uppercase">users</Link>
            <div className="ml-auto">
                <ModeToggle />
            </div>
        </nav>
    )
}
