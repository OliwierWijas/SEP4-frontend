export function useDeleteMember() {
    const deleteMember = async (username, refreshMemberData) => {
        if (username) {
            const token = localStorage.getItem("jwt")
            const response = await fetch(`http://localhost:8080/home/members/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "PATCH"
            })
            if (response.ok) {
                refreshMemberData(prev => prev + 1)
                const responseBody = await response.text()
                alert(responseBody)
            } else {
                alert("Error while removing member.")
            }
        }
    }
    return deleteMember
}