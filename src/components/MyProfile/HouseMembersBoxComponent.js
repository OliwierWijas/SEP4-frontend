import HouseMembersComponent from "./HouseMembersComponent.js";
import AddHouseMember from "./AddHouseMemberComponent.js"; // Assuming the component file is named AddHouseMember.js
import '../../styles/ScrollBar.css';
import { useMembers } from "../../hooks/mocks/useMembersMock.js";
import { useState } from 'react';

function HouseMembersBoxComponent() {
    const [membersData, setMembersData] = useState(useMembers(1)); 

    const handleDeleteMember = (index) => {
        const updatedMembersArray = membersData.filter((_, i) => i !== index);
        setMembersData(updatedMembersArray);
    };

    const handleAddMember = (username) => {
        if (username.trim() !== '') { // Check if username is not empty
            setMembersData([...membersData, { username }]); // Add new member to the state
        }
    };

    return (
        <div>
        <AddHouseMember onAddMember={handleAddMember} /> 
        <div className="brown-gradient-y h-400 w-full flex flex-col rounded-md shadow-md mb-10" data-testid="member-box">
            <div className="min-h-24 w-full flex items-center ml-5 text-2xl lg:text-4xl font-bold text-white">HOUSE MEMBERS</div>
            <div className="bg-white mb-2 bg-opacity-15 h-full w-full text-xs md:text-sm lg:text-base flex flex-col justify-start rounded-md overflow-y-auto scrollbar">
                <div className="flex flex-wrap">
                    {membersData.map((member, index) => (
                        <div key={index} className={`w-1/2 p-2 ${index === membersData.length - 1 && membersData.length % 2 !== 0 ? 'self-start' : ''}`}>
                            <HouseMembersComponent
                                member={member} 
                                onDeleteMember={() => handleDeleteMember(index)}
                                data-testid="house-member"
                            />
                        </div>
                    ))}
                </div>
            </div>
           </div>
        </div>
    );
}

export default HouseMembersBoxComponent;
