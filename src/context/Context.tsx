import { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";
import { en, ru } from "../language";

interface ContextType {
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  lang: typeof en | typeof ru;
  setLang: Dispatch<SetStateAction<typeof en | typeof ru>>;
  changeLang: (bool: boolean) => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [flag, setFlag] = useState<boolean>(false);
  const [lang, setLang] = useState<typeof en | typeof ru>(ru);

  function changeLang(bool: boolean) {
    setLang(bool ? ru : en);
    setFlag(!bool);
  }

  return (
    <Context.Provider value={{ flag, setFlag, lang, setLang, changeLang}}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
