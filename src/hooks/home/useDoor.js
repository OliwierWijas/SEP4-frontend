export function useDoor() {
    const switchDoor = async (houseId, password, state) => {
        try {
            if (houseId > 0 && password !== undefined && state !== undefined) {
                const token = localStorage.getItem("jwt")

                const body = {
                    password,
                    state
                }

                const response = await fetch(`http://localhost:8080/door/houses/${houseId}/doors/switch`, {
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    method: "POST",
                    body: JSON.stringify(body),
                }).catch(error => alert(`Error changing door state: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    alert(responseBody)
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