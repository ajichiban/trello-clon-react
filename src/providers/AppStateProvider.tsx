
import { useReducer } from 'react'
import { appData, AppStateContext } from '../context/AppStateContext'
import { appStateReducer } from '../reducers/appStateReducer'

interface Props{
  children: JSX.Element | JSX.Element[]
}

export const AppStateProvider = ({children}:Props) => {

  const [state, dispatch] = useReducer(appStateReducer, appData)

  return (
    <AppStateContext.Provider value={{state, dispatch}} >
      {children}
    </AppStateContext.Provider>
  )
}
