import { useState, useEffect } from "react";

export function useMembers(homeId) {
    const [membersData, setMembersData] = useState([]);

    useEffect(() => {
        if (homeId > 0) {
            const controller = new AbortController()
            const signal = controller.signal

            fetch(`http://localhost:8080/home/${homeId}/members`, { signal })
                .then(response => response.json())
                .then(data => {
                    setMembersData(data)
                })
                .catch(error => {
                    if (error.name !== "AbortError") {
                        alert(`Error fetching members: ${error}`)
                    }
                })

            return () => {
                controller.abort()
            }
        }
    }, [homeId]);

    return membersData;
}
