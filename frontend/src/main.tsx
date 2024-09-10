import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Investors } from "./routes/investors/Investors.tsx"
import { Commitments } from "./routes/commitments/Commitments.tsx"

import "./index.css"
import "./App.css"

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
