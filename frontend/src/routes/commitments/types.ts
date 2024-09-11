export type Commitment = {
  investor_type: string
  date_added: string
  asset_class: string
  currency: string
  investor_name: string
  id: number
  investor_country: string
  last_updated: string
  amount: number
}

export type AssetClassItem = {
  asset_class_name: string
  total_commitment: number
}
