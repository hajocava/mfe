import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App'

// Mount functions to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    })

    if (onNavigate) {
        history.listen(onNavigate)
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
        onParentNavigate({ pathname: nextPath }) {
            const { pathname } = history.location;
            if (pathname !== nextPath) {
                history.push(nextPath);
            }
        }
    }
}

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')

    if (devRoot) {
        mount(devRoot, {
            defaultHistory: createBrowserHistory()
        })
    }
}

// We are running through container and we should export the mount function
export { mount }
