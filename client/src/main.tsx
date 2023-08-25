import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import InjectTailwind from "./InjectTailwind";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import router from './router/RouterConfig.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <InjectTailwind>
        <RouterProvider router={router} />
      </InjectTailwind>
    </Provider>
  </React.StrictMode>,
)
