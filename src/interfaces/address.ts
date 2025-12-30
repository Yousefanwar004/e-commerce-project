export interface AddressI {
  status: string
  message: string
  data: allAddress[]
}

export interface allAddress {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}