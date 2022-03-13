import type { City } from './queries'

export const city: City = {
  id: 1,
  name: 'London',
  country: 'United Kingdom',
  wishlist: false,
  visited: false,
}

export const createMockCity = (updates: Partial<City> = {}) => ({
  ...city,
  ...updates,
})
