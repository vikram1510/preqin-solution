export const filterParams = (search: string, assetFilterSelected: string) => {
  const params = new URLSearchParams(search)

  if (assetFilterSelected === "All") {
    params.delete("asset_class")
  } else {
    params.set("asset_class", assetFilterSelected)
  }

  return params.toString()
}
