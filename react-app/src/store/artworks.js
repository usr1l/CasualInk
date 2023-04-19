const GET_ARTWORKS = "artworks/GET_ARTWORKS"

export const thunkGetArtworks = () => async (dispatch) => {
  const response = await fetch("/api/artworks")
  const data = await response.json()
  console.log("DATA", data)
}

const actionGetArtworks = (data) => {
  return {
    type: GET_ARTWORKS,
    payload: data
  }
}

const initialState = { allArtworks: {}, singleArtworkId: null }

const artworks = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTWORKS:
      return state
    default:
      return state
  }
}

export default artworks
