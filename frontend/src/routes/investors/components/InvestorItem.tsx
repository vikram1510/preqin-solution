import { useNavigate } from "react-router-dom"
import { Investor } from "../types"

type InvestorItemProps = {
  investor: Investor
}

export const InvestorItem = (props: InvestorItemProps) => {
  const navigate = useNavigate()
  return (
    <tr
      onClick={() =>
        navigate(encodeURI("/commitments?investor_name=Ibx Skywalker ltd"), {
          state: { investorName: props.investor.investor_name },
        })
      }
    >
      <th>{props.investor.investor_name}</th>
      <th>{props.investor.investor_type}</th>
      <th>{props.investor.investor_country}</th>
      <th>{props.investor.total_commitment}</th>
    </tr>
  )
}
