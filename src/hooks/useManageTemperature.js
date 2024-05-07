import { useEffect } from "react"

export function useManageTemperature(radiatorStatus) {
    useEffect(() => {
        const manageTemperature = async () => {
            const response = await fetch("http://localhost:8080/manageTemperature", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(radiatorStatus),
            })
            if (response.ok) {
                return "Temperature has been changed."
            }
            else {
                return "Error while changing temperature."
            }
        }

        manageTemperature()
    }, [radiatorStatus])
}