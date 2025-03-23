import Link from "next/link"
import { infractions } from "@/data/infractions"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-700">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 relative">
              <div className="absolute w-8 h-4 bg-[#3D9970] rounded-full top-1 left-1 transform -rotate-45"></div>
              <div className="absolute w-8 h-4 bg-[#3D9970] rounded-full top-3 left-1 transform rotate-45"></div>
            </div>
            <h1 className="text-2xl font-normal text-[#666666] ml-1">Serttel</h1>
          </div>
          <div className="ml-4 text-xs text-gray-600 hidden md:block">
            Sistema Integrado de
            <br />
            Gestão de Trânsito
          </div>
        </div>
        {/* Navegação removida */}
      </div>

      {/* Title */}
      <div className="bg-[#f2f2f2] p-4 border-b border-gray-200">
        <h2 className="font-normal text-gray-700 text-center text-xl">Sistema de Notificações de Infrações</h2>
      </div>

      {/* Breadcrumb removido */}

      <div className="container mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-normal text-gray-600 mb-6">Notificações de Autuação</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {infractions.map((infraction) => (
            <Link
              href={`/infracoes/${infraction.id}`}
              key={infraction.id}
              className="block bg-white p-4 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-medium text-[#3D9970] mb-2">{infraction.id}</div>
              <div className="text-sm mb-1">
                <span className="text-gray-500">Placa:</span> {infraction.vehicleInfo.plate}
              </div>
              <div className="text-sm mb-1">
                <span className="text-gray-500">Proprietário:</span> {infraction.vehicleInfo.owner}
              </div>
              <div className="text-sm mb-1">
                <span className="text-gray-500">Data:</span> {infraction.infractionDetail.date}
              </div>
              <div className="text-sm font-medium mt-2 text-right">
                Total: R$ {(infraction.debtInfo.total + infraction.paymentInfo.fine).toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

