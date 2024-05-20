export function useAddMember() {
    const addMember = async (username) => {
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
                }).catch(error => alert(`Error adding member: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    alert(responseBody)
                } else {
                    alert("Error while adding member.")
                }
            }
        } catch (error) {
            alert("Error while adding member.")
        }
    }
    return addMember
}