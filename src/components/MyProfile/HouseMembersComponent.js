import { IoTrashOutline } from 'react-icons/io5';
import { useDeleteMember } from '../../hooks/home/useDeleteMember.js';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext.js';

function HouseMembersComponent({ member, refreshMemberData }) {
    const { claims } = useContext(AuthContext)
    const token = claims?.token
    const isAdmin = Boolean(claims?.role === "Admin")

    const deleteMember = useDeleteMember();

    const handleDelete = async () => {
        deleteMember(member.username, refreshMemberData, token);
    };

    return (
        <div className="bg-white bg-opacity-15 h-fit w-95 mx-2 my-2 rounded-md flex items-center text-wrap">
            <div className="flex-grow my-2 mx-2 text-justify md:text-left">{member.username}</div>
            {isAdmin && (
                <div>
                    <IoTrashOutline onClick={handleDelete} className="mr-2" data-testid="delete-button" />
                </div>
            )}
        </div>
    );
}

export default HouseMembersComponent;
