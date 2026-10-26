import { NavLink } from "react-router-dom";
const NavBar = () => {
    return ( 
        <nav className="px-5 border-b border-indigo-200 ">
            <div className="flex justify-start w-[95vw] m-auto h-full">
                <NavLink to="/" className={({isActive}) => 
                `w-[200px] h-full text-2xl py-5  flex justify-center
                ${isActive ? "bg-indigo-950" : "hover:bg-indigo-950"}
                `}>Market</NavLink>
                <NavLink to="/portfolio" className={({isActive}) => 
                `w-[200px] h-full text-2xl py-5  flex justify-center
                ${isActive ? "bg-indigo-950" : "hover:bg-indigo-950"}
                `}>Portfolio</NavLink>
            </div>
        </nav>
    );
}
 
export default NavBar;