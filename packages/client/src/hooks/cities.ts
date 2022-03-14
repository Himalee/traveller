import { useQuery } from '@apollo/client'
import type { CitiesRequestVars, CitiesResponseData} from '../queries';
import { GET_CITIES } from '../queries'

export function useFilteredCities(filter: 'wishlist' | 'visited', value: boolean) {
  const { data, error, loading } = useQuery<CitiesResponseData, CitiesRequestVars>(GET_CITIES, {
    variables: { filter: { [filter]: value } },
  })
  return { data, error, loading }
}
