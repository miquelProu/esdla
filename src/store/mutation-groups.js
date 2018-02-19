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
    types.AREA_PLAYER_OUT_DECK,
    types.AREA_VIATGE,
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
    types.AREA_QUEST_DECK,
    types.AREA_VIATGE
];

export const AREA_TO_GET= [
    {agafar: 'questDeck', area: types.AREA_QUEST_DECK},
    {agafar: 'questOutDeck', area: types.AREA_QUEST_OUT_DECK},
    {agafar: 'playerDeck', area: types.AREA_PLAYER_DECK},
    {agafar: 'playerOutDeck', area: types.AREA_QUEST_OUT_DECK},
    {agafar: 'hero', area: types.AREA_HERO},
    {agafar: 'ma', area: types.AREA_MA},
    {agafar: 'preparacio', area: types.AREA_PREPARACIO},
    {agafar: 'missionDeck', area: types.AREA_MISION_DECK},
    {agafar: 'missionOutDeck', area: types.AREA_MISION_OUT_DECK},
    {agafar: 'aliats', area: types.AREA_ALIATS},
    {agafar: 'atack', area: types.AREA_ATACK},
    {agafar: 'viatge', area: types.AREA_VIATGE}
];