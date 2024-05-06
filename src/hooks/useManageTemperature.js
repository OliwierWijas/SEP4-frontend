export async function useManageTemperature(temperatureStatus) {
    const manageTemperature = async () => {
        const response = await fetch("http://localhost:8080/manageTemperature", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(temperatureStatus),
        })
        if (response.ok) {
            return "Temperature has been changed."
        }
        else {
            return "Error while changing temperature."
        }
    }

    await manageTemperature()
}