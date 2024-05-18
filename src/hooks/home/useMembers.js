import { useState, useEffect } from "react";

// useMembers.js
export function useMembers(houseId) {
    const [membersData, setMembersData] = useState([]);

    useEffect(() => {
        if (houseId > 0) {
            const controller = new AbortController();
            const signal = controller.signal;

            fetch('http://localhost:8080/members', { signal })
                .then(response => response.json())
                .then(data => {
                    setMembersData(data);
                })
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching members: ${error}`);
                    }
                });

            return () => {
                controller.abort();
            };
        }
    }, [houseId]);

    return membersData;
}
