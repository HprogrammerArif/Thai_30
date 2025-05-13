import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/router';
import { Provider } from 'react-redux';
import { store } from './Pages/redux/features/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </Provider>,
)
