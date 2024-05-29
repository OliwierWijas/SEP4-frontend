export function useDeleteMember() {
    const deleteMember = async (username, refreshMemberData, token) => {
        if (username) {
            const response = await fetch(`http://172.214.63.209:80/home/members/${username}`, {
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