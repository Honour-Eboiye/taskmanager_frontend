import { useEffect, useState } from 'react'

export function useApi(api) {
  const [info, setInfo] = useState([])
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (!api) return
    const fetchData = async () => {
      setIsPending(true)
      try {
        const response = await fetch(api, {
          method:"GET",
          credentials: "include", // <-- Add this line
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        console.log("Response: ", response);

        const data = await response.json()
        
        console.log("Data: ", data);
        setInfo(data.tasks)
        setErrors(null) // Clear previous errors if successful
      } catch (error) {
        setErrors(error.message || 'Something went wrong')
      } finally {
        setIsPending(false)
      }
    }

    fetchData()
  }, [api])

  return { info, isPending, errors }
}
