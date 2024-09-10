import { useFetchInvestors } from "../../hooks/useFetchInvestors"

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
            <tr key={investor.investor_name}>
              <th>{investor.investor_name}</th>
              <th>{investor.investor_type}</th>
              <th>{investor.investor_country}</th>
              <th>{investor.total_commitment}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
