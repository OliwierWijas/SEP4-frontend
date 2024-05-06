export async function useManageLight(lightStatus) {
    const manageLight = async () => {
        const response = await fetch("http://localhost:8080/manageLight", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(lightStatus),
        })
        if (response.ok) {
            return "Light level has been changed."
        }
        else {
            return "Error while changing light level."
        }
    }

    await manageLight()
}