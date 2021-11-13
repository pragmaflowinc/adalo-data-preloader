import React, { createContext, useContext, useEffect, useState } from 'react'

export const AppContext = createContext({
  app: {},
  setApp: () => null,
  unsafeGetToken: () => {}
})

export default function AppProvider ({ app, children, unsafeGetToken }) {
  const [_app, setApp] = useState()
  useEffect(() => {
    setApp(app)
  }, [app])
  return (
    <AppContext.Provider
      value={{
        app: _app,
        setApp,
        unsafeGetToken
      }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}