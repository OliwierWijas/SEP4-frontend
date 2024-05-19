export function useDeleteMember() {
    const deleteMember = async (username) => {
        if (username) {
            const token = localStorage.getItem("jwt")
            const response = await fetch(`http://localhost:8080/auth/houses/members/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "DELETE"
            })
            if (response.ok) {
                alert("Member has been removed from home.")
            }
            else {
                const responseBody = await response.text();
                try {
                    const errorResponse = JSON.parse(responseBody);
                    const errorMessage = errorResponse.title;
                    alert(errorMessage);
                } catch (error) {
                    alert(responseBody);
                }
            }
        }
    }
    return deleteMember
}