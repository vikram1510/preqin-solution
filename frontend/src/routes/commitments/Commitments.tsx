import { useLocation } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { COMMITTMENTS_API_URL } from "../../constants"
import { Commitment } from "./types"
import { investorNameFromSearchParams } from "./utils/investorNameFromSearchParams"
import { aggregateByAssetClass } from "./utils/aggregateByAssetClass"
import { useState } from "react"
import "./assetClass.css"

export const Commitments = () => {
  const [filterAsset, setFilterAsset] = useState("all")
  const { search } = useLocation()
  const { data, loading } = useFetch<Commitment[]>(
    `${COMMITTMENTS_API_URL}${search}`
  )
  const investorName = investorNameFromSearchParams(search)

  if (loading) return <p>Loading...</p>

  if (!data) return <p>Error</p>

  const assetClassItems = aggregateByAssetClass(data)

  return (
    <div className="centered-container">
      <h1>{`Commitments for Investor - ${investorName}`}</h1>
      <div className="asset-class-container">
        {assetClassItems.map((assetClass) => (
          <label
            key={assetClass.name}
            className={`card ${
              filterAsset === assetClass.name ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="assetClass"
              value={assetClass.name}
              checked={filterAsset === assetClass.name}
              // onChange={() => handleSelect(assetClass)}
            />
            <span className="card-content">{assetClass.name}</span>
          </label>
        ))}
      </div>
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
            <tr key={commitment.id}>
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
