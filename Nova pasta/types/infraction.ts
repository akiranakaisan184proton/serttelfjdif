export interface VehicleInfo {
  plate: string
  model: string
  owner: string
  location: string
}

export interface DebtInfo {
  ipva: number
  previousFines: number
  total: number
}

export interface InfractionDetail {
  description: string
  points: number
  date: string
  time: string
  issueDate: string
}

export interface PaymentInfo {
  fine: number
  pixCode: string
}

export interface InfractionNotice {
  id: string
  vehicleInfo: VehicleInfo
  debtInfo: DebtInfo
  infractionDetail: InfractionDetail
  paymentInfo: PaymentInfo
  imageUrl: string
}

