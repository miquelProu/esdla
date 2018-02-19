// ACTIONS
export const ADD_CART_TO_DECK = 'ADD_CART_TO_DECK'
export const SET_TO_ALL_DECK_QUEST = 'SET_TO_ALL_DECK_QUEST'
export const SET_TO_ALL_DECK_PLAYER = 'SET_TO_ALL_DECK_PLAYER'
export const SET_TO_QUEST_DECK = 'SET_TO_QUEST_DECK'
export const SET_TO_QUEST_OUT_DECK = 'SET_TO_QUEST_OUT_DECK'
export const SET_TO_PLAYER_DECK = 'SET_TO_PLAYER_DECK'
export const SET_TO_PLAYER_OUT_DECK = 'SET_TO_PLAYER_OUT_DECK'
export const SET_TO_MISION_DECK = 'SET_TO_MISION_DECK'
export const SET_TO_MISION_OUT_DECK = 'SET_TO_MISION_OUT_DECK'
export const SET_TO_HERO = 'SET_TO_HERO'
export const SET_TO_MA = 'SET_TO_MA'
export const SET_TO_PREPARACIO = 'SET_TO_PREPARACIO'
export const SET_TO_ALIATS = 'SET_TO_ALIATS'
export const SET_TO_ATACK = 'SET_TO_ATACK'
export const SET_TO_VIATGE = 'SET_TO_VIATGE'
export const SET_TO_SHOW = 'SET_TO_SHOW'
export const SET_N_VINCULADA = 'SET_N_VINCULADA'

// export const ADD_VIATGE = 'ADD_VIATGE'
// export const SUB_VIATGE = 'SUB_VIATGE'
// export const ADD_DAMAGE = 'ADD_DAMAGE'
// export const SUB_DAMAGE = 'SUB_DAMAGE'
// export const ADD_RESOURCE = 'ADD_RESOURCE'
// export const SUB_RESOURCE = 'SUB_RESOURCE'

export const ONE_TO_PREPARACIO = 'ONE_TO_PREPARACIO'

export const SET_LUPA_CARD = 'SET_LUPA_CARD'
export const SET_LUPA_POSITION = 'SET_LUPA_POSITION'

export const PLAYER = 'PLAYER'
export const QUEST = 'QUEST'

export const ADD_AMENASA = 'ADD_AMENASA'
export const SUB_AMENASA = 'SUB_AMENASA'
export const ADD_TORN = 'ADD_TORN'

export const TOGGLE_N_CARTES = 'TOGGLE_N_CARTES'
export const TOGGLE_SHOW_CARTES = 'TOGGLE_SHOW_CARTES'
export const SET_SHOW_CARTES = 'SET_SHOW_CARTES'
export const NUM_CARTES = 'NUM_CARTES'
export const ROL_N_CARTES = 'ROL_N_CARTES'

// AREAS
export const AREA_PREPARACIO = 'AREA_PREPARACIO'
export const AREA_ATACK = 'AREA_ATACK'
export const AREA_HERO = 'AREA_HERO'
export const AREA_ALIATS = 'AREA_ALIATS'
export const AREA_MA = 'AREA_MA'
export const AREA_QUEST_DECK = 'AREA_QUEST_DECK'
export const AREA_QUEST_OUT_DECK = 'AREA_QUEST_OUT_DECK'
export const AREA_MISION_DECK = 'AREA_MISION_DECK'
export const AREA_MISION_OUT_DECK = 'AREA_MISION_OUT_DECK'
export const AREA_PLAYER_DECK = 'AREA_PLAYER_DECK'
export const AREA_PLAYER_OUT_DECK = 'AREA_PLAYER_OUT_DECK'
export const AREA_VIATGE = 'AREA_VIATGE'
export const AREA_SHOW = 'AREA_SHOW'

export function translateAreaSetTo(area){
    let nom = area.substring(5, area.length);
    return 'SET_TO_' + nom;
};

export function translateSetToArea(set){
    let nom = set.substring(7, set.length);
    return 'AREA_' + nom;
}