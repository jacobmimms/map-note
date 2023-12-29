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
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case 'REMOVE_POST':
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload),
            };
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === action.payload.id) {
                        return action.payload;
                    }
                    return post;
                }),
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

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
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

        debounce(
            () => {
                getNearbyPosts(location).then((posts) => {
                    current_posts = posts;
                    dispatch({ type: 'SET_POSTS', payload: posts });
                    localStorage.setItem('posts', JSON.stringify(posts));
                });
            }, 5000
        )

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
