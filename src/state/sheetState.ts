import { atom } from 'recoil';
import { localStorageEffect } from './sheetState.effects';

export const enum StateId {
  sheetId = 'sheetId',
  sheetIds = 'sheetIds',
}

export const activeSheetIdState = atom<string>({
  key: StateId.sheetId,
  default: '',
  effects: [
    localStorageEffect<string>('active_sheet_id')
  ]
});

export const sheetIdsState = atom<Array<string>>({
  key: StateId.sheetIds,
  default: [],
  effects: [
    localStorageEffect<Array<string>>('sheet_history')
  ]
});


