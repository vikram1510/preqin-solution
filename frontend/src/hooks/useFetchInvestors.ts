import { INVESTOR_API_URL } from "../constants"
import { useFetch } from "./useFetch"

type Investor = {
  investor_name: string
  investor_type: string
  investor_country: string
  total_commitment: number
}

export const useFetchInvestors = () => useFetch<Investor[]>(INVESTOR_API_URL)
