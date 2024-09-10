import { useLocation } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { COMMITTMENTS_API_URL } from "../../constants"
import { Commitment } from "./types"

export const Commitments = () => {
  const { search } = useLocation()
  const { data, loading } = useFetch<Commitment[]>(
    `${COMMITTMENTS_API_URL}${search}`
  )

  if (loading) return <p>Loading...</p>

  if (!data) return <p>Error</p>

  return (
    <div className="centered-container">
      <h1>Commitments</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset Class</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((commitment) => (
            <tr>
              <th>{commitment.id}</th>
              <th>{commitment.asset_class}</th>
              <th>{commitment.amount}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
