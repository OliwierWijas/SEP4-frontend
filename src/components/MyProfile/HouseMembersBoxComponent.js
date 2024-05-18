import HouseMembersComponent from "./HouseMembersComponent.js";
import AddHouseMember from "./AddHouseMemberComponent.js";
import '../../styles/ScrollBar.css';
import { useMembers } from "../../hooks/mocks/useMembersMock.js";
import { useState, useEffect } from 'react';

function HouseMembersBoxComponent() {
    const initialMembers = useMembers(1); 
    const [membersData, setMembersData] = useState([]);

    useEffect(() => {
        setMembersData(initialMembers);
    }, [initialMembers]);

    /*const handleDeleteMember = (index) => {
        const updatedMembersArray = membersData.filter((_, i) => i !== index);
        setMembersData(updatedMembersArray);
    };

    const handleAddMember = (username) => {
        if (username.trim() !== '') {
            setMembersData([...membersData, { username }]);
        }
    };*/

    return (
        <div>

            <div className="brown-gradient-y h-400 w-full flex flex-col rounded-md shadow-md my-14" data-testid="member-box">
                <div className="min-h-24 w-full flex justify-between items-center p-5">
                    <div className=" ml-5 text-2xl lg:text-4xl font-bold text-white ">HOUSE MEMBERS
                    </div>
                    <AddHouseMember onAddMember={handleAddMember} />
                </div>


                <div className="bg-white mb-2 bg-opacity-15 h-full w-full text-xs md:text-sm lg:text-base flex flex-col justify-start rounded-md overflow-y-auto scrollbar">
                    <div className="flex flex-wrap">
                        {membersData && membersData.map((member, index) => (
                            <div key={index} className={`w-1/2 p-2 ${index === membersData.length - 1 && membersData.length % 2 !== 0 ? 'self-start' : ''}`} data-testid="house-member">
                                <HouseMembersComponent
                                    member={member}
                                    //onDeleteMember={() => handleDeleteMember(index)}
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
