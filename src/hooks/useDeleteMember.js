
export function useDeleteMember() {
    
    const deleteMember = async ({ houseId, username }) => {
        
        try {
            await fetch(`http://localhost:8080/deleteMember`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ houseId, username }),
            });
            return true;
        } catch (error) {
            console.error('Error deleting member:', error);
            return false;
        } 
    };

    return { deleteMember};
}
