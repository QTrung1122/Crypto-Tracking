import { FaSearch } from "react-icons/fa";

const SearchBar = ({openSearchBox}: {openSearchBox: ()=>void}) => {
    return ( 
        <div className="flex justify-center pt-5 search-bar">
            <div className="flex items-center bg-[#323546] rounded-[8px] h-[35px] w-[400px] p-5 cursor-pointer mb-[10px]" onClick={openSearchBox}>
                <FaSearch className="mr-5"/>
                <span>Search</span>
            </div>
        </div>
     );
}
 
export default SearchBar