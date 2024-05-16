import { useState } from 'react';

export function useDeleteMember() {
    
    const deleteMember = async ({ houseId, username }) => {
        
        try {
            // Send a DELETE request to your server to delete the member
            await fetch(`http://localhost:8080/deleteMember`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ houseId, username }),
            });
            // Return true to indicate successful deletion
            return true;
        } catch (error) {
            console.error('Error deleting member:', error);
            // Return false to indicate failure
            return false;
        } 
    };

    return { deleteMember};
}
