const initialState = JSON.parse(localStorage.getItem('favorites')) || [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const updatedStateAdd = [...state, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updatedStateAdd));
      return updatedStateAdd;
    case 'REMOVE_FAVORITE':
      const updatedStateRemove = state.filter(hotel => hotel.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(updatedStateRemove));
      return updatedStateRemove;
    default:
      return state;
  }
};

export default favoritesReducer;
