import { useEffect, useState } from "react"

export const useFetch = <D>(url: string) => {
  const [data, setData] = useState<D>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      })
  }, [url])

  return { data, loading }
}
