import BrownButton from "../BrownButton.js";
import { useState } from 'react';

function AddHouseMember({ onAddMember }) {
    const [username, setUsername] = useState('');

    const handleAdd = () => {
        if (username.trim() !== '') { 
            onAddMember(username); 
            setUsername('');
        }
    };

    return (
        <div className="flex w-full lg:w-1/2 flex-row my-8">
            <input 
                className="w-full h-8 p-1 rounded-md shadow-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75 border border-brown-500" 
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
                <BrownButton text="Add" className="text-bold" onClick={handleAdd}/> 
            </div>
        </div>
    );
}

export default AddHouseMember;
