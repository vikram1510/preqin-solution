import { useLocation } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { ASSET_CLASSES_API_URL, COMMITTMENTS_API_URL } from "../../constants"
import { AssetClassItem, Commitment } from "./types"
import { investorNameFromSearchParams } from "./utils/investorNameFromSearchParams"
import { ChangeEvent, useState } from "react"
import { AssetFilterCard } from "./components/AssetFilterCard"
import "./components/assetClass.css"
import { filterParams } from "./utils/filterParams"
import { totalCommitment } from "./utils/totalCommitment"
import { toGBP } from "../../utils/toGbp"

export const Commitments = () => {
  const [filterAsset, setFilterAsset] = useState("All")
  const { search } = useLocation()
  const investorName = investorNameFromSearchParams(search)

  const { data: commitmentsData, loading: commitmentsDataLoading } = useFetch<
    Commitment[]
  >(`${COMMITTMENTS_API_URL}?${filterParams(search, filterAsset)}`)

  const { data: assetClassData, loading: assetClassDataLoading } = useFetch<
    AssetClassItem[]
  >(`${ASSET_CLASSES_API_URL}?investor_name=${investorName}`)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterAsset(e.target.value)
  }

  if (commitmentsDataLoading || assetClassDataLoading) return <p>Loading...</p>

  if (!commitmentsData || !assetClassData) return <p>Error</p>

  return (
    <div className="centered-container">
      <h1>{`Commitments for Investor - ${investorName}`}</h1>
      <div className="asset-class-container">
        <AssetFilterCard
          assetClassName="All"
          totalCommitment={toGBP(totalCommitment(assetClassData))}
          isSelected={filterAsset === "All"}
          onChange={handleChange}
        />
        {assetClassData.map((assetClassItem) => (
          <AssetFilterCard
            key={assetClassItem.asset_class_name}
            assetClassName={assetClassItem.asset_class_name}
            totalCommitment={toGBP(assetClassItem.total_commitment)}
            isSelected={filterAsset === assetClassItem.asset_class_name}
            onChange={handleChange}
          />
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
          {commitmentsData.map((commitment) => (
            <tr key={commitment.id}>
              <th>{commitment.id}</th>
              <th>{commitment.asset_class}</th>
              <th>{toGBP(commitment.amount)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
