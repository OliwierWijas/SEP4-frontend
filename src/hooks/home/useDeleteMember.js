export function useDeleteMember() {
    const deleteMember = async (username) => {
        if (username) {
            const token = localStorage.getItem("jwt")
            const response = await fetch(`http://localhost:8080/home/members/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "PATCH"
            })
            if (response) {
                const responseBody = await response.text()
                alert(responseBody)
            } else {
                alert("Error while adding member.")
            }
        }
    }
    return deleteMember
}