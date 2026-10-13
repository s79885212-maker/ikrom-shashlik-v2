import type { CustomerDetails } from '../types'

export type CustomerField = 'name' | 'phone' | 'address'
export type CustomerErrorKey = 'nameRequired' | 'phoneRequired' | 'phoneInvalid' | 'addressRequired'
export type CustomerErrors = Partial<Record<CustomerField, CustomerErrorKey>>

export function validateCustomer(customer: CustomerDetails): CustomerErrors {
  const errors: CustomerErrors = {}

  if (customer.name.trim().length < 2) errors.name = 'nameRequired'

  const phone = customer.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!phone) errors.phone = 'phoneRequired'
  else if (!/^\+?[\d\s()-]+$/.test(phone) || digits.length < 9 || digits.length > 15) {
    errors.phone = 'phoneInvalid'
  }

  if (customer.method === 'delivery' && customer.address.trim().length < 5) {
    errors.address = 'addressRequired'
  }

  return errors
}
