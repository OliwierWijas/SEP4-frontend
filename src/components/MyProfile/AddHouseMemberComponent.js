import BrownButton from "../BrownButton.js";
import { useContext, useState } from 'react';
import { useAddMember } from "../../hooks/home/useAddMember.js";
import { AuthContext } from "../../auth/AuthContext.js";

function AddHouseMember({refreshMemberData}) {
    const { claims } = useContext(AuthContext)
    const token = claims?.token
    const houseId = claims?.houseId

    const [username, setUsername] = useState('');
    const addMember = useAddMember()

    const onAdd = () => {
        addMember(username, refreshMemberData, token, houseId)
        setUsername('')
    };

    return (
        <div className="flex w-full lg:w-1/2 flex-row">
            <input 
                className="w-full h-8 p-1 mt-1 rounded-md shadow-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75 border border-brown-500" 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Enter the username..." 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required 
                data-testid="username-input"
            />
            <div className="mx-2">
                <BrownButton text="Add" className="text-bold" onClick={onAdd}/> 
            </div>
        </div>
    );
}

export default AddHouseMember;
