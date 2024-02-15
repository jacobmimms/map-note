"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { calculateDistance, getNearbyPosts } from "@/app/utils/main";
import { useRef, useCallback, useMemo } from "react";

const initialState = {
  location: null,
  posts: [],
  posts_loading: true,
  location_loading: true,
};

const LocationAndPostsContext = createContext(initialState);

export const useLocationAndPosts = () => useContext(LocationAndPostsContext);

function reducer(state, action) {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
        posts_loading: false,
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
        location_loading: false,
      };
    case "RELOAD_POSTS":
      return {
        ...state,
        posts_loading: true, // Set loading to true to trigger reload
      };
    case "SET_POSTS_LOADING":
      return {
        ...state,
        posts_loading: action.payload,
      };

    default:
      return state;
  }
}

export const LocationAndPostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let lastLocationRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      lastLocationRef.current = localStorage.getItem("lastLocation")
        ? JSON.parse(localStorage.getItem("lastLocation"))
        : null;
      if (lastLocationRef.current) {
        dispatch({ type: "SET_LOCATION", payload: lastLocationRef.current });
      }
    }
  }, []);

  const handleError = useCallback((error) => {
    console.error("Geolocation Error:", error);
  }, []);

  const handleSuccess = useCallback(
    (position) => {
      if (position && position.coords) {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        if (
          !lastLocationRef.current ||
          calculateDistance(lastLocationRef.current, newLocation) >= 50
        ) {
          console.log("updating location");
          lastLocationRef.current = newLocation;
          localStorage.setItem("lastLocation", JSON.stringify(newLocation));
          dispatch({ type: "SET_LOCATION", payload: newLocation });
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (state.location && state.location.latitude && state.location.longitude) {
      getNearbyPosts(state.location)
        .then((posts) => {
          dispatch({ type: "SET_POSTS", payload: posts });
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        })
        .finally(() => {
          dispatch({ type: "SET_POSTS_LOADING", payload: false }); // Ensure to stop loading
        });
    }
  }, [state.location, dispatch]);

  useEffect(() => {
    const watchId =
      navigator.geolocation &&
      navigator.geolocation.watchPosition(handleSuccess, handleError);
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [handleSuccess, handleError]);

  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );

  return (
    <LocationAndPostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LocationAndPostsContext.Provider>
  );
};
