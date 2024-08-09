"use client"
import React, { useState } from 'react'

const Landing = ({ username }: {
    username: string | any,
}) => {
    const [response, setResponse] = useState<object>();
    const handleApiCall = async (call: string, node = '') => {
        try {
            const url = !node ? `/${call}` : `/${call}?node=${node}`;
            const res = await fetch(`http://localhost:3000/api${url}`);
            const data = await res.json();
            setResponse(data);
            console.log(data);

        } catch (error) {
            console.error("Error during API call:", error);
            setResponse({ data: { error: (error as Error).message } });
            console.log(error);
        }
    }
    return (
        <div>
            Welcome {username}!
            Actions
            <ul>
                <li><button onClick={() => handleApiCall('version')}>Version</button></li>
                <li><button onClick={() => handleApiCall('nodes')}>Nodes</button></li>
                <li><button onClick={() => handleApiCall('status', "prox")}>Status</button></li>
                <li><button onClick={() => handleApiCall('nodes/prox')}>VM</button></li>
            </ul>
            <br />
            <div>
                {response ? (
                    typeof response === "object" && !Array.isArray(response) ? (
                        <div>
                            {Object.entries(response).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong>{" "}
                                    {typeof value === "object" ? JSON.stringify(value, null, 2) : value.toString()}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    )
                ) : (
                    "No data yet."
                )}
            </div>
        </div>
    )
}

export default Landing