import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Investors } from "./routes/investors/Investors.tsx"
import { Commitments } from "./routes/commitments/Commitments.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Investors />,
  },
  {
    path: "/commitments/:investorId",
    element: <Commitments />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
