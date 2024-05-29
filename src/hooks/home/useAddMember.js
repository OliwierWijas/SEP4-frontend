export function useAddMember() {
    const addMember = async (username, refreshMemberData, token, houseId) => {
        try {
            if (username !== undefined && username !== null && username !== '') {
                const response = await fetch(`http://172.214.63.232:80/home/${houseId}/members/${username}`, {
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