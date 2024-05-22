export function useAddMember() {
    const addMember = async (username, refreshMemberData) => {
        try {
            if (username !== undefined && username !== null && username !== '') {
                const token = localStorage.getItem("jwt")
                const houseId = localStorage.getItem("houseId")
                const response = await fetch(`http://localhost:8080/home/${houseId}/members/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "PATCH",
                })
                if (response) {
                    refreshMemberData(prev => prev + 1)
                    const responseBody = await response.text()
                    alert(responseBody)
                }
            }
        } catch (error) {
            alert("Error while adding member.")
        }
    }
    return addMember
}