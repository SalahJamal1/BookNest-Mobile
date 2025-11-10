import useCabins from "@/hooks/useCabins";
import useRefresh from "@/hooks/useRefresh";
import { IACTION, ICabins, ICONTEXT, IState, IUSER } from "@/utils/helper";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

type Props = {
  children: ReactNode;
};

const initialState: IState = {
  cabins: [],
  error: "",
  loader: false,
  user: {} as IUSER,
  cabin: {} as ICabins,
  auth: false,
};
const reducer = (state: IState, action: IACTION): IState => {
  switch (action.type) {
    case "CABINS_LOADER":
      return { ...state, loader: true };
    case "CABINS_ERROR":
      return { ...state, error: action.payload, loader: false };
    case "CABINS_DATA":
      return { ...state, cabins: action.payload, loader: false, error: "" };
    case "CABIN_DATA":
      return { ...state, cabin: action.payload, loader: false, error: "" };

    case "USER_LOGIN":
      return { ...state, user: action.payload, auth: true };
    case "USER_REFRESH":
      return { ...state, user: action.payload, auth: true };
    case "USER_LOGOUT":
      return { ...state, user: {} as IUSER, auth: false };
    default:
      return state;
  }
};
const WildProvider = createContext<null | ICONTEXT>(null);
export default function WildContext({ children }: Props) {
  const [{ loader, error, cabins, user, auth, cabin }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { fetchCabins } = useCabins();
  useEffect(() => {
    fetchCabins(dispatch);
  }, []);

  useRefresh(dispatch);

  const value = useMemo(() => {
    return {
      loader,
      error,
      dispatch,
      cabins,
      user,
      auth,
      cabin,
    };
  }, [loader, error, dispatch, cabins, user, auth, cabin]);
  return (
    <WildProvider.Provider value={value}>{children}</WildProvider.Provider>
  );
}

export function useWild(): ICONTEXT {
  const context = useContext(WildProvider);
  if (!context) throw new Error("There is no WildProvider");
  return context;
}
