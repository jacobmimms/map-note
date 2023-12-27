'use client'
import { createContext, useReducer, useEffect } from 'react';

export const PostsContext = createContext();

const initialState = {
    posts: [],
};

function postsReducer(state, action) {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
            };
        default:
            return state;
    }
}


export const PostsProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postsReducer, initialState);

    // Load posts from localStorage on initial render
    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            dispatch({ type: 'SET_POSTS', payload: JSON.parse(savedPosts) });
        }
    }, []);

    // Save posts to localStorage whenever they change
    useEffect(() => {
        if (postState.posts.length === 0) {
            return;
        }
        localStorage.setItem('posts', JSON.stringify(postState.posts));
    }, [postState.posts]);

    return (
        <PostsContext.Provider value={{ postState, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};
