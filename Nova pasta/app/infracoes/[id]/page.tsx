"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AlertCircle, ChevronDown, ChevronUp, AlertTriangle, Copy, QrCode } from "lucide-react"
import type { InfractionNotice } from "@/types/infraction"

export default function InfractionPage() {
  const params = useParams()
  const id = params.id as string

  const [infraction, setInfraction] = useState<InfractionNotice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showVehicleInfo, setShowVehicleInfo] = useState(true)
  const [showInfractionDetails, setShowInfractionDetails] = useState(true)
  const [showInfractionImage, setShowInfractionImage] = useState(true)
  const [showDebts, setShowDebts] = useState(true)

  useEffect(() => {
    async function fetchInfraction() {
      try {
        const response = await fetch(`/api/infractions/${id}`)
        if (!response.ok) {
          throw new Error("Falha ao carregar os dados da infração")
        }
        const data = await response.json()
        setInfraction(data)
      } catch (err) {
        setError("Erro ao carregar os dados. Por favor, tente novamente.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInfraction()
  }, [id])

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Código PIX copiado para a área de transferência")
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err)
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3D9970] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações...</p>
        </div>
      </div>
    )
  }

  if (error || !infraction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-red-800 mb-2">Erro</h2>
          <p className="text-red-600">{error || "Infração não encontrada"}</p>
        </div>
      </div>
    )
  }

  const totalAmount = infraction.debtInfo.total + infraction.paymentInfo.fine

  return (
    <div className="min-h-screen bg-white text-gray-700">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 relative">
                <div className="absolute w-8 h-4 bg-[#3D9970] rounded-full top-1 left-1 transform -rotate-45"></div>
                <div className="absolute w-8 h-4 bg-[#3D9970] rounded-full top-3 left-1 transform rotate-45"></div>
              </div>
              <h1 className="text-2xl font-normal text-[#666666] ml-1">Serttel</h1>
            </div>
          </div>
          <div className="ml-4 text-xs text-gray-600 hidden md:block">
            Sistema Integrado de
            <br />
            Gestão de Trânsito
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="bg-[#f2f2f2] p-4 border-b border-gray-200">
        <h2 className="font-normal text-gray-700 text-center text-xl">Trânsito Inteligente</h2>
      </div>

      <div className="container mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-normal text-gray-600 mb-6">
          Notificação de Autuação de Infração de Trânsito
          <span className="text-sm ml-2 text-[#3D9970]">#{infraction.id}</span>
        </h1>

        {/* Alert */}
        <div className="bg-[#f8f9fa] p-3 border-l-4 border-[#3D9970] flex items-start mb-6 rounded">
          <AlertCircle className="text-[#3D9970] mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-gray-700">Atenção</p>
            <p className="text-gray-600">
              Esta notificação deve ser paga até o vencimento para evitar multas e pontos adicionais.
            </p>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="mb-6 bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm">
          <button
            className="w-full p-3 flex justify-between items-center bg-[#3D9970] text-white"
            onClick={() => setShowVehicleInfo(!showVehicleInfo)}
          >
            <h3 className="text-sm font-medium">Informações do Veículo</h3>
            {showVehicleInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showVehicleInfo && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#f8f9fa] p-3 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Placa</p>
                  <p className="font-medium text-sm">{infraction.vehicleInfo.plate}</p>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Marca/Modelo</p>
                  <p className="font-medium text-sm">{infraction.vehicleInfo.model}</p>
                </div>
              </div>
              <div className="bg-[#f8f9fa] p-3 rounded mb-4 border border-gray-200">
                <p className="text-xs text-gray-500">Proprietário</p>
                <p className="font-medium text-sm">{infraction.vehicleInfo.owner}</p>
              </div>
              <div className="bg-[#f8f9fa] p-3 rounded border border-gray-200">
                <p className="text-xs text-gray-500">Local</p>
                <p className="font-medium text-sm">{infraction.vehicleInfo.location}</p>
              </div>
            </div>
          )}
        </div>

        {/* Outstanding Debts */}
        <div className="mb-6 bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm">
          <button
            className="w-full p-3 flex justify-between items-center bg-[#3D9970] text-white"
            onClick={() => setShowDebts(!showDebts)}
          >
            <h3 className="text-sm font-medium">Débitos em Aberto do Veículo</h3>
            {showDebts ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showDebts && (
            <div className="p-4">
              <div className="bg-[#f8f9fa] p-4 rounded border border-gray-200">
                <div className="flex items-start mb-4">
                  <AlertTriangle className="text-[#ff9800] mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Para utilizar nosso programa de proteção à CNH, é necessário quitar todos os débitos pendentes do
                    veículo.
                  </p>
                </div>

                <div className="mt-4 border-t border-gray-300 pt-4">
                  <p className="text-xs text-gray-500 mb-3">Detalhamento dos débitos:</p>

                  <div className="bg-white p-3 rounded mb-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">IPVA em atraso:</span>
                      <span className="text-sm font-medium text-gray-800">
                        R$ {infraction.debtInfo.ipva.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded mb-3 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Multas anteriores:</span>
                      <span className="text-sm font-medium text-gray-800">
                        R$ {infraction.debtInfo.previousFines.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Total de débitos:</span>
                      <span className="text-sm font-bold text-[#3D9970]">
                        R$ {infraction.debtInfo.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Infraction Details */}
        <div className="mb-6 bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm">
          <button
            className="w-full p-3 flex justify-between items-center bg-[#3D9970] text-white"
            onClick={() => setShowInfractionDetails(!showInfractionDetails)}
          >
            <h3 className="text-sm font-medium">Detalhes da Infração</h3>
            {showInfractionDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showInfractionDetails && (
            <div className="p-4">
              <div className="bg-[#f8f9fa] p-3 rounded mb-4 border border-gray-200">
                <p className="text-xs text-gray-500">Infração</p>
                <p className="font-medium text-sm">{infraction.infractionDetail.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {infraction.infractionDetail.points} pontos na CNH | Veículo sujeito à remoção
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#f8f9fa] p-3 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Data</p>
                  <p className="font-medium text-sm">{infraction.infractionDetail.date}</p>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Hora</p>
                  <p className="font-medium text-sm">{infraction.infractionDetail.time}</p>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Emissão</p>
                  <p className="font-medium text-sm">{infraction.infractionDetail.issueDate}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Violation Image */}
        <div className="mb-6 bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm">
          <button
            className="w-full p-3 flex justify-between items-center bg-[#3D9970] text-white"
            onClick={() => setShowInfractionImage(!showInfractionImage)}
          >
            <h3 className="text-sm font-medium">Imagem da Infração</h3>
            {showInfractionImage ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showInfractionImage && (
            <div className="p-4">
              <div className="bg-[#f8f9fa] p-3 rounded border border-gray-200">
                <div className="w-full h-[200px] bg-gray-200 rounded relative overflow-hidden">
                  {/* Placeholder para imagem real */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                    Imagem do veículo
                  </div>
                  {/* Quando tiver imagens reais, descomente o código abaixo */}
                  {/* 
                  <Image 
                    src={infraction.imageUrl || "/placeholder.svg"} 
                    alt="Imagem da infração" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                  */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-[#f8f9fa] p-4 border-t border-gray-200 mb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-lg font-normal text-gray-700 mb-4">Informações de Pagamento</h3>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <p className="text-xs text-gray-500">Detalhamento</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 mr-8">Multa:</span>
                    <span className="text-gray-700">R$ {infraction.paymentInfo.fine.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 mr-8">Débitos em aberto:</span>
                    <span className="text-gray-700">R$ {infraction.debtInfo.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium mt-2 pt-2 border-t border-gray-300">
                    <span className="text-gray-800 mr-8">Total:</span>
                    <span className="text-gray-800">R$ {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#3D9970] hover:bg-[#2d8057] text-white text-sm h-10 px-6 rounded mt-4 md:mt-0">
                Pagar Agora
              </button>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Código de Pagamento</p>
              <div className="flex items-center bg-[#f8f9fa] p-2 rounded border border-gray-200">
                <div className="flex-1 truncate font-mono text-xs text-gray-700">{infraction.paymentInfo.pixCode}</div>
                <button
                  className="ml-1 h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
                  onClick={() => copyToClipboard(infraction.paymentInfo.pixCode)}
                >
                  <Copy className="h-3 w-3 mx-auto" />
                </button>
              </div>
            </div>

            <div className="flex justify-center mb-3">
              <div className="bg-[#f8f9fa] p-3 rounded-md border border-gray-200">
                <div className="w-32 h-32 bg-white flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-500" />
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-gray-700">Escaneie o QR Code para pagar via PIX</p>
          </div>
        </div>
      </div>

      {/* Floating Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-gray-200 flex justify-between items-center z-20 shadow-md">
        <div>
          <p className="text-xs text-gray-500">Total a pagar</p>
          <p className="text-base font-medium text-gray-700">R$ {totalAmount.toFixed(2)}</p>
        </div>
        <button className="bg-[#3D9970] hover:bg-[#2d8057] text-white text-sm h-10 px-6 rounded">Pagar Agora</button>
      </div>
    </div>
  )
}

