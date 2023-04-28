import normalizeFn from "../components/HelperFns/NormalizeFn";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const DELETE_OWNER_ARTWORK = "session/DELETE_OWNER_ARTWORK";
const UPLOAD_OWNER_ARTWORK = "session/UPLOAD_OWNER_ARTWORK";
const EDIT_OWNER_ARTWORK = "session/EDIT_OWNER_ARTWORK";
const CREATE_OWNER_ARTLISTING = "session/CREATE_OWNER_ARTLISTING";
const CREATE_OWNER_AUCTIONLISTING = "session/CREATE_OWNER_AUCTIONLISTING";
const DELETE_OWNER_ARTLISTING = "session/DELETE_OWNER_ARTLISTING";
const DELETE_OWNER_AUCTIONLISTING = "session/DELETE_OWNER_AUCTIONLISTING";
// const EDIT_OWNER_AUCTIONLISTING = "session/EDIT_OWNER_AUCTIONLISTING";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return [ "An error occurred. Please try again." ];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (signupData) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: signupData
	});

	if (response.ok) {
		const data = await response.json();

		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return [ "An error occurred. Please try again." ];
	};
};

export const actionDeleteOwnerArtwork = (artworkId) => {
	return {
		type: DELETE_OWNER_ARTWORK,
		payload: artworkId
	};
};

export const actionUploadOwnerArtwork = (data) => {
	return {
		type: UPLOAD_OWNER_ARTWORK,
		payload: data
	};
};

export const actionOwnerEditArtwork = (data) => {
	return {
		type: EDIT_OWNER_ARTWORK,
		payload: data
	};
};

export const actionOwnerCreateArtlisting = (data) => {
	return {
		type: CREATE_OWNER_ARTLISTING,
		payload: data
	};
};

export const actionOwnerCreateAuctionListing = (data) => {
	return {
		type: CREATE_OWNER_AUCTIONLISTING,
		payload: data
	};
};

export const actionOwnerDeleteArtListing = (artlistingId) => {
	return {
		type: DELETE_OWNER_ARTLISTING,
		payload: artlistingId
	};
};

export const actionOwnerEditArtListing = (data) => {
	return {
		type: CREATE_OWNER_ARTLISTING,
		payload: data
	};
};

export const actionOwnerEditAuctionListing = (data) => {
	return {
		type: CREATE_OWNER_AUCTIONLISTING,
		payload: data
	};
};

export const actionOwnerDeleteAuctionListing = (auctionlistingId) => {
	return {
		type: DELETE_OWNER_AUCTIONLISTING,
		payload: auctionlistingId
	};
};

export default function reducer(state = initialState, action) {
	let updatedState;
	switch (action.type) {
		case SET_USER:
			action.payload.artListings = normalizeFn(action.payload.artListings)
			action.payload.auctionListings = normalizeFn(action.payload.auctionListings)
			action.payload.artworks = normalizeFn(action.payload.artworks)
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case DELETE_OWNER_ARTWORK:
			updatedState = {
				...state,
				user: {
					...state.user,
					artworks: {
						...state.user.artworks
					}
				}
			}
			delete updatedState.user.artworks[ action.payload ]
			return updatedState;
		case UPLOAD_OWNER_ARTWORK:
			return {
				...state,
				user: {
					...state.user,
					artworks: {
						...state.user.artworks,
						[ action.payload.id ]: action.payload
					}
				}
			}
		case EDIT_OWNER_ARTWORK:
			return {
				...state,
				user: {
					...state.user,
					artworks: {
						...state.user.artworks,
						[ action.payload.id ]: action.payload
					}
				}
			}
		case CREATE_OWNER_ARTLISTING:
			return {
				...state,
				user: {
					...state.user,
					artListings: {
						...state.user.artListings,
						[ action.payload.id ]: action.payload
					}
				}
			}
		case CREATE_OWNER_AUCTIONLISTING:
			return {
				...state,
				user: {
					...state.user,
					auctionListings: {
						...state.user.auctionListings,
						[ action.payload.id ]: action.payload
					}
				}
			}
		case DELETE_OWNER_ARTLISTING:
			updatedState = {
				...state,
				user: {
					...state.user,
					artListings: {
						...state.user.artListings,
					}
				}
			}
			delete updatedState.user.artListings[ action.payload ]
		case DELETE_OWNER_AUCTIONLISTING:
			updatedState = {
				...state,
				user: {
					...state.user,
					auctionListings: {
						...state.user.auctionListings,
					}
				}
			}
			delete updatedState.user.auctionListings[ action.payload ]
			return updatedState;
		default:
			return state;
	}
}
