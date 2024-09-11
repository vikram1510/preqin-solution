import { AssetClassItem, Commitment } from "../types"

type AssetClassMap = {
  [key: string]: AssetClassItem
}

export const aggregateByAssetClass = (
  commitments: Commitment[]
): AssetClassItem[] => {
  const assetClassMap = commitments.reduce<AssetClassMap>(
    (map, { asset_class }) => {
      if (asset_class in map) {
        map[asset_class].totalCommitments += 1
      } else {
        map[asset_class] = { totalCommitments: 1, name: asset_class }
      }
      return map
    },
    {}
  )
  return Object.values(assetClassMap)
}
