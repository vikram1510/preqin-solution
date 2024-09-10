import { InvestorItem } from "./components/InvestorItem"
import { useFetchInvestors } from "./hooks/useFetchInvestors"

export const Investors = () => {
  const { data, loading } = useFetchInvestors()

  if (loading) return <p>Loading...</p>

  if (!data) return <p>Error</p>

  return (
    <div className="centered-container">
      <h1>Investors</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Investor Name</th>
            <th>Investor Type</th>
            <th>Investor Country</th>
            <th>Total Commitment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((investor) => (
            <InvestorItem key={investor.investor_name} investor={investor} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
