import { AssetClassItem } from "../types"

export const totalCommitment = (assetClassItems: AssetClassItem[]) => {
  return assetClassItems.reduce((sum, item) => sum + item.total_commitment, 0)
}
