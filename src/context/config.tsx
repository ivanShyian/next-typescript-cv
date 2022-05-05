import {createContext, ReactChild, useContext, useEffect} from 'react'
import {useState} from 'react'

interface Props {
  children: ReactChild
}

interface NameValue {
  name: string
  value: string
}

interface ConfigInterface {
  links: [{
    en: NameValue,
    uk: NameValue
  }],
  status: [{
    en: string,
    uk: string
  }],
  avatar: string,
  _id: string,
  emailReceiver: string
}

export type ConfigType = ConfigInterface

const AppContext = createContext({
  config: {} as ConfigType,
  setConfig: (config: ConfigType): void => {}
})

export function ConfigWrapper({ children }: Props) {
  const [config, setConfig] = useState<ConfigType>({} as ConfigType)

  return (
    <AppContext.Provider value={{config, setConfig}}>
      {children}
    </AppContext.Provider>
  );
}

export function useConfigContext() {
  return useContext(AppContext);
}
