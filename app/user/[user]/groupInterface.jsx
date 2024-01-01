'use client'
import { createContext, useReducer, useEffect, useState } from 'react';

export default function GroupInterface() {
    const [success, setSuccess] = useState(false);
    const [newId, setNewId] = useState(null);
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        try {
            fetch('/api/groups', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (response) => {
                    response.json().then(
                        (data) => {
                            console.log(data);
                            setNewId(data.id);
                            setSuccess(true);
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                },
                (error) => {
                    console.log(error);
                }
            )

        } catch (error) {
            console.error("error creating group", error)
        }
    }

    useEffect(() => {
        if (success) {
            console.log("success");
        }
    }, [success])

    if (success) {
        return (
            <div>
                <h1>Group Interface</h1>
                <p>Group Created</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Group Interface</h1>
            <form className='' action="/api/groups" method="POST" onSubmit={handleSubmit}>
                <input placeholder={'group name'} className='bg-slate-700 p-2  mx-2 rounded-lg' type="text" name="name" id="name" />
                <button className='bg-slate-700 rounded-lg p-2' type="submit">Create Group</button>
            </form>
        </div>
    )
}
