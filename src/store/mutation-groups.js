import * as types from './mutation-types'

//GROUP
export const PLAYING_DECK_LIST = [
    types.AREA_PREPARACIO,
    types.AREA_ATACK,
    types.AREA_HERO,
    types.AREA_ALIATS,
    types.AREA_MA,
    types.AREA_QUEST_DECK,
    types.AREA_QUEST_OUT_DECK,
    types.AREA_MISION_DECK,
    types.AREA_MISION_OUT_DECK,
    types.AREA_PLAYER_DECK,
    types.AREA_PLAYER_OUT_DECK
];

export const PLAYING_ALIES_DECK_LIST = [
    types.AREA_HERO,
    types.AREA_ALIATS,
    types.AREA_MA,
    types.AREA_PLAYER_DECK
];
export const PLAYING_QUEST_DECK_LIST = [
    types.AREA_PREPARACIO,
    types.AREA_ATACK,
    types.AREA_QUEST_DECK
];