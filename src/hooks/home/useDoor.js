export function useDoor() {
    const switchDoor = async (houseId, password, state, token) => {
        try {
            if (houseId > 0 && password !== undefined && state !== undefined) {

                const body = {
                    password,
                    state
                }

                const response = fetch(`http://localhost:8080/door/houses/${houseId}/doors/switch`, {
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