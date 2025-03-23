import type { InfractionNotice } from "@/types/infraction"

export const infractions: InfractionNotice[] = [
  {
    id: "INF001",
    vehicleInfo: {
      plate: "SAO-8900",
      model: "VLR RRS P/EV A8",
      owner: "BRUNO DE AGUIAR NASCIMENTO",
      location: "Av. Paulista, 1000 - São Paulo",
    },
    debtInfo: {
      ipva: 1948.0,
      previousFines: 489.9,
      total: 2437.9,
    },
    infractionDetail: {
      description: "Estacionamento irregular na Zona Azul de São Paulo",
      points: 5,
      date: "13/03/2023",
      time: "14:32:46",
      issueDate: "13/03/2023",
    },
    paymentInfo: {
      fine: 195.23,
      pixCode: "89660000001952300001234567890123456789",
    },
    imageUrl: "/images/vehicle-infraction-001.jpg",
  },
  {
    id: "INF002",
    vehicleInfo: {
      plate: "RIO-2345",
      model: "HONDA CIVIC LXR",
      owner: "MARIA SILVA OLIVEIRA",
      location: "Rua da Consolação, 500 - São Paulo",
    },
    debtInfo: {
      ipva: 1250.0,
      previousFines: 320.5,
      total: 1570.5,
    },
    infractionDetail: {
      description: "Excesso de velocidade em via urbana",
      points: 7,
      date: "15/03/2023",
      time: "09:45:22",
      issueDate: "15/03/2023",
    },
    paymentInfo: {
      fine: 293.47,
      pixCode: "89660000002934700001234567890123456789",
    },
    imageUrl: "/images/vehicle-infraction-002.jpg",
  },
  {
    id: "INF003",
    vehicleInfo: {
      plate: "BHZ-7812",
      model: "TOYOTA COROLLA XEI",
      owner: "CARLOS EDUARDO MENDES",
      location: "Av. Rebouças, 750 - São Paulo",
    },
    debtInfo: {
      ipva: 0,
      previousFines: 150.25,
      total: 150.25,
    },
    infractionDetail: {
      description: "Avanço de sinal vermelho",
      points: 7,
      date: "10/03/2023",
      time: "16:20:15",
      issueDate: "10/03/2023",
    },
    paymentInfo: {
      fine: 293.47,
      pixCode: "89660000002934700001234567890123456790",
    },
    imageUrl: "/images/vehicle-infraction-003.jpg",
  },
]

export function getInfractionById(id: string): InfractionNotice | undefined {
  return infractions.find((infraction) => infraction.id === id)
}

export function getAllInfractionIds(): string[] {
  return infractions.map((infraction) => infraction.id)
}

