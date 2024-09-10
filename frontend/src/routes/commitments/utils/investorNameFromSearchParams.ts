export const investorNameFromSearchParams = (search: string) => {
  const urlParams = new URLSearchParams(search)
  return urlParams.get("investor_name")
}
