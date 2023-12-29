'use client'
import { createContext, useReducer, useEffect, useContext } from 'react';
import { LocationContext } from './locationProvider';
export const PostsContext = createContext();

const initialState = {
    posts: [],
    loading: true,
};

function postsReducer(state, action) {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

async function getNearbyPosts({ latitude, longitude }) {
    let posts;
    try {
        posts = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ nearby: true, latitude, longitude }),
        });
        posts = await posts.json();
    } catch (error) {
        console.error('fetching posts failed', error);
    }
    return posts;
}

export const PostsProvider = ({ children }) => {
    const location = useContext(LocationContext);
    const [postState, dispatch] = useReducer(postsReducer, initialState);


    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            dispatch({ type: 'SET_POSTS', payload: JSON.parse(savedPosts) });
        }
    }, []);

    useEffect(() => {
        if (!location.latitude && !location.longitude) {
            return;
        }
        let current_posts;
        getNearbyPosts(location).then((posts) => {
            current_posts = posts;
        });
        if (current_posts) {
            dispatch({ type: 'SET_POSTS', payload: current_posts });
            localStorage.setItem('posts', JSON.stringify(current_posts));
        }
    }, [location]);

    return (
        <PostsContext.Provider value={{ postState, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};
