import { INVESTOR_API_URL } from "../../../constants"
import { useFetch } from "../../../hooks/useFetch"
import { Investor } from "../types"

export const useFetchInvestors = () => useFetch<Investor[]>(INVESTOR_API_URL)
