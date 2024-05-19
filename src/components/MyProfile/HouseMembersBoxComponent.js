import HouseMembersComponent from "./HouseMembersComponent.js";
import AddHouseMember from "./AddHouseMemberComponent.js";
import '../../styles/ScrollBar.css';
import { useMembers } from "../../hooks/home/useMembers.js";

function HouseMembersBoxComponent() {
    //in case you need to add a useState first getMembers from the database, save as constant and then setstate
    const members = useMembers(localStorage.getItem("houseId"))

    return (
        <div>
            <AddHouseMember />
            <div className="brown-gradient-y h-400 w-full flex flex-col rounded-md shadow-md mb-10" data-testid="member-box">
                <div className="min-h-24 w-full flex items-center ml-5 text-2xl lg:text-4xl font-bold text-white">HOUSE MEMBERS</div>
                <div className="bg-white mb-2 bg-opacity-15 h-full w-full text-xs md:text-sm lg:text-base flex flex-col justify-start rounded-md overflow-y-auto scrollbar">
                    <div className="flex flex-wrap">
                        {members && members.map((member, index) => (
                            <div key={index} className={`w-1/2 p-2 ${index === members.length - 1 && members.length % 2 !== 0 ? 'self-start' : ''}`} data-testid="house-member">
                                <HouseMembersComponent member={member}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HouseMembersBoxComponent;
