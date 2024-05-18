import { IoTrashOutline } from 'react-icons/io5';
import { useDeleteMember } from '../../hooks/home/useDeleteMember.js';

function HouseMembersComponent({ member, onDeleteMember }) {
    const { deleteMember } = useDeleteMember();

    const handleDelete = async () => {
        await deleteMember({ houseId: member.houseId, username: member.username });
        onDeleteMember(); 
    };

    return (
        <div className="bg-white bg-opacity-15 h-fit w-95 mx-2 my-2 rounded-md flex md:items-center text-wrap">
            <div className="flex-grow my-2 mx-2 text-justify md:text-left">{member.username}</div>
            <div>
                <IoTrashOutline onClick={handleDelete} className="mr-2" data-testid="delete-button"/>
            </div>
        </div>
    );
}

export default HouseMembersComponent;
