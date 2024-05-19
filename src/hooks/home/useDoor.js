export function useDoor() {
    const switchDoor = async (houseId, password, state) => {
        try {
            console.log(houseId)
            console.log(password)
            console.log(state)
            if (houseId > 0 && password !== undefined && state !== undefined) {
                const body = {
                    password,
                    state
                }
                const response = await fetch(`http://localhost:8080/door/houses/${houseId}/doors/switch`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(body),
                }).catch(error => alert(`Error changing door state: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    const errorResponse = JSON.parse(responseBody)
                    const errorMessage = errorResponse.title
                    alert(errorMessage)
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