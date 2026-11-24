import { tokenStore } from "../../services/tokenStore";

const useHavingToken = () => Boolean(tokenStore.get());


export default useHavingToken;