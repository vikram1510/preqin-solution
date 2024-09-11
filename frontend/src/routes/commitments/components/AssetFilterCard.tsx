import { ChangeEvent } from "react"
import { AssetClassItem } from "../types"

type AssetFilterCardProps = {
  assetClassItem: AssetClassItem
  isSelected: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AssetFilterCard = (props: AssetFilterCardProps) => {
  return (
    <label className={`card ${props.isSelected ? "selected" : ""}`}>
      <input
        type="radio"
        name="assetClass"
        value={props.assetClassItem.asset_class_name}
        checked={props.isSelected}
        onChange={props.onChange}
      />
      <span className="card-content">
        {`${props.assetClassItem.asset_class_name} (${props.assetClassItem.total_commitment})`}
      </span>
    </label>
  )
}
