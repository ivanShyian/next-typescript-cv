import {createContext, ReactChild, useContext, useEffect} from 'react'
import {useState} from 'react'

interface Props {
  children: ReactChild
}

interface Config {
  links: [{
    name: string
    value: string
  }]
  emailReceiver: string
}

const AppContext = createContext({
  config: {},
  setConfig: (config: Config) => {}
})

export function ConfigWrapper({ children }: Props) {
  const [config, setConfig] = useState({})

  return (
    <AppContext.Provider value={{config, setConfig}}>
      {children}
    </AppContext.Provider>
  );
}

export function useConfigContext() {
  return useContext(AppContext);
}
