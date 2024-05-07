import { useEffect } from "react"

export function useManageWindow(windowStatus) {
    useEffect(() => {
        const manageWindow = async () => {
            const response = await fetch("http://localhost:8080/manageWindow", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(windowStatus),
            })
            if (response.ok) {
                return `Window has been ${windowStatus}.`
            }
            else {
                return "Error while changing the state of the window."
            }
        }

        manageWindow()
    }, [windowStatus])
}