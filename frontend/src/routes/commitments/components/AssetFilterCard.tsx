import { ChangeEvent } from "react"

type AssetFilterCardProps = {
  assetClassName: string
  totalCommitment: string
  isSelected: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AssetFilterCard = (props: AssetFilterCardProps) => {
  return (
    <label className={`card ${props.isSelected ? "selected" : ""}`}>
      <input
        type="radio"
        name="assetClass"
        value={props.assetClassName}
        checked={props.isSelected}
        onChange={props.onChange}
      />
      <span className="card-content">
        {`${props.assetClassName} (${props.totalCommitment})`}
      </span>
    </label>
  )
}
