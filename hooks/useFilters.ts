import { useMemo } from 'react'

export const useFilter = <T extends Record<string, any>>({ data = [], search = '' }) => {
  return useMemo(() => {
    if (!search) return data

    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [data, search])
}
