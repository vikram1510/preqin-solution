export const Investors = () => {
  return (
    <div className="centered-container">
      <h1>Investors</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Investor Name</th>
            <th>Investor Type</th>
            <th>Investor Country</th>
            <th>Date Added</th>
            <th>Total Commitment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>Vikram Bageja</th>
            <th>fund manager</th>
            <th>Singapore</th>
            <th>2000-07-06</th>
            <th>£4050</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
