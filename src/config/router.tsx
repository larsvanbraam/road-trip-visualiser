import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { EnterSheetId } from '../pages/enter-sheet-id/EnterSheetId';
import React from 'react';

export const enum RouterLink {
  Home = '/',
  EnterSheetId = '/enter-sheet-id'
}

export const router = createBrowserRouter([
  {
    path: RouterLink.Home,
    element: <Home />,

  },
  {
    path: RouterLink.EnterSheetId,
    element: <EnterSheetId /> ,
  },
]);