'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function GroupInfo({ group }) {
    const [checkDelete, setCheckDelete] = useState(false);
    const [succeess, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    function handleDelete() {
        setCheckDelete(true);
    }

    function handleCancel() {
        setCheckDelete(false);
    }

    function handleConfirm() {
        fetch(`/api/groups/${group.id}`, {
            method: 'DELETE',
        }).then(
            (response) => {
                response.json().then(
                    (data) => {
                        console.log(data);
                        setSuccess(true);
                    },
                    (error) => {
                        console.log(error);
                        setFailure(true);
                    }

                )
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        if (succeess) {
            // show success message
            setCheckDelete(false);

        }
        if (failure) {
            // show failure message
            setCheckDelete(false);
        }
    }, [succeess, failure])

    if (checkDelete) {
        return (
            <div className='flex flex-row w-full items-center'>
                <div className='bg-slate-700 hover:bg-slate-600 p-2 rounded-lg' >
                    <Link className='' href={`/groups/${group.id}`}>
                        {group.name}
                    </Link>
                </div>
                <div>
                    {group.posts.length} posts
                </div>

                <button className='bg-red-700 hover:bg-red-600 rounded-lg p-2' onClick={handleConfirm}>
                    Confirm
                </button>
                <button className='bg-green-700 hover:bg-green-600 rounded-lg p-2' onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        )
    }

    if (succeess) {
        return (
            <div className='flex flex-row w-full items-center'>
                <div className='bg-slate-700 hover:bg-slate-600 p-2 rounded-lg' >
                    <Link className='' href={`/groups/${group.id}`}>
                        {group.name}
                    </Link>
                </div>
                <div>
                    {group.posts.length} posts
                </div>

                <div className='bg-green-700 hover:bg-green-600 rounded-lg p-2'>
                    Success
                </div>
            </div>
        )
    }


    return (
        <div className='flex flex-row w-full items-center'>
            <div className='bg-slate-700 hover:bg-slate-600 p-2 rounded-lg' >
                <Link className='' href={`/groups/${group.id}`}>
                    {group.name}
                </Link>
            </div>
            <div>
                {group.posts.length} posts
            </div>

            <button className='bg-red-700 hover:bg-red-600 rounded-lg p-2' onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}