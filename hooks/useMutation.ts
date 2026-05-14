
import { apiRequest } from '@/lib/apiRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UseMutationOptions<TData = any, TVariables = any> {
  url: any
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  invalidateKeys?: string[]
  onSuccess?: (data: TData) => void
  onError?: (error: unknown) => void
}

export const useMutationApi = <TData = any, TVariables = any>({
  url,
  method = 'POST',
  headers = {},
  invalidateKeys = [],
  onSuccess,
  onError,
}: UseMutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient()

  return useMutation<TData, unknown, TVariables>({
    mutationFn: (variables) =>
      apiRequest<TData>({
        url: typeof url === 'function' ? url(variables) : url,
        method,
        data: method === 'DELETE' ? undefined : variables,
        headers,
      }),

    onSuccess: (response) => {
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({
          queryKey: [key],
          exact: false, // 👈 important
        })
      )      
      onSuccess?.(response)
    },

    onError: (error) => {
      console.error(`Mutation error:`, error)
      onError?.(error)
    },
  })
}
