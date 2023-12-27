'use client'
import { createContext, useReducer } from 'react';

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
    const [state, dispatch] = useReducer(postsReducer, initialState);

    return (
        <PostsContext.Provider value={{ state, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};
