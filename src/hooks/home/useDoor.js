export function useDoor() {
    const switchDoor = async (houseId, password, state, token) => {
        try {
            if (houseId > 0 && password !== undefined && state !== undefined) {
                const temp = Boolean(state)

                const body = {
                    password,
                    state: temp
                }

                const response = await fetch(`http://172.214.63.232:80/door/houses/${houseId}/doors/switch`, {
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    method: "POST",
                    body: JSON.stringify(body),
                }).catch(error => alert(`Error changing door state: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    alert(responseBody)
                    if (response.ok) {
                        return true
                    }
                } else {
                    alert("Error while changing door state.")
                }
            }
        } catch (error) {
            alert("Error while changing door state.")
        }
    }

    return switchDoor
}