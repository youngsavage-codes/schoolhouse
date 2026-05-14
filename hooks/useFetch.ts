import { apiGet } from '@/lib/apiRequest'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface UseFetchProp {
  keys: string[]
  url: string
  options?: {
    enabled?: boolean
    refetchInterval?: number
    retry?: number
    staleTime?: number
    params?: Record<string, any>
    headers?: Record<string, string>
  }
}

export const useFetch = ({
  keys,
  url,
  options = {},
}: UseFetchProp): UseQueryResult<any, Error> => {
  const {
    enabled = true,
    refetchInterval,
    retry = 1,
    staleTime = 1000 * 60 * 5, // 5 minutes
    params,
    headers,
  } = options

  return useQuery({
    // ✅ CRITICAL: params must be object, NOT stringified
    queryKey: [...keys, params],

    queryFn: () => apiGet(url, { params, headers }),

    staleTime,
    enabled,
    refetchInterval,
    retry,

    // ✅ Let React Query control refetch lifecycle
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}
