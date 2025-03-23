"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { InfractionNotice } from "@/types/infraction"

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState<Partial<InfractionNotice>>({
    id: "",
    vehicleInfo: {
      plate: "",
      model: "",
      owner: "",
      location: "",
    },
    debtInfo: {
      ipva: 0,
      previousFines: 0,
      total: 0,
    },
    infractionDetail: {
      description: "",
      points: 0,
      date: "",
      time: "",
      issueDate: "",
    },
    paymentInfo: {
      fine: 0,
      pixCode: "",
    },
    imageUrl: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Handle nested properties for number inputs
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: Number.parseFloat(value) || 0,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value) || 0,
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const calculateTotal = () => {
    if (formData.debtInfo) {
      const ipva = formData.debtInfo.ipva || 0
      const previousFines = formData.debtInfo.previousFines || 0

      setFormData({
        ...formData,
        debtInfo: {
          ...formData.debtInfo,
          total: ipva + previousFines,
        },
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Aqui você implementaria a lógica para enviar os dados para o servidor
      // Incluindo o upload da imagem

      // Simulação de envio bem-sucedido
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMessage({
        type: "success",
        text: "Infração cadastrada com sucesso!",
      })

      // Redirecionar para a página de listagem após sucesso
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error("Erro ao cadastrar infração:", error)
      setMessage({
        type: "error",
        text: "Erro ao cadastrar infração. Tente novamente.",
      })
    } finally {
      setLoading(false)
    }
  }

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
      </div>

      {/* Title */}
      <div className="bg-[#f2f2f2] p-4 border-b border-gray-200">
        <h2 className="font-normal text-gray-700 text-center text-xl">Administração do Sistema</h2>
      </div>

      <div className="container mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-normal text-gray-600 mb-6">Cadastrar Nova Infração</h1>

        {message && (
          <div
            className={`p-4 mb-6 rounded-md ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Informações Básicas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID da Infração</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <h3 className="text-md font-medium text-gray-700 mb-2 mt-4">Informações do Veículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
                <input
                  type="text"
                  name="vehicleInfo.plate"
                  value={formData.vehicleInfo?.plate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca/Modelo</label>
                <input
                  type="text"
                  name="vehicleInfo.model"
                  value={formData.vehicleInfo?.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proprietário</label>
                <input
                  type="text"
                  name="vehicleInfo.owner"
                  value={formData.vehicleInfo?.owner}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                <input
                  type="text"
                  name="vehicleInfo.location"
                  value={formData.vehicleInfo?.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Débitos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IPVA em Atraso (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="debtInfo.ipva"
                  value={formData.debtInfo?.ipva}
                  onChange={handleNumberChange}
                  onBlur={calculateTotal}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Multas Anteriores (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="debtInfo.previousFines"
                  value={formData.debtInfo?.previousFines}
                  onChange={handleNumberChange}
                  onBlur={calculateTotal}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total de Débitos (R$)</label>
              <input
                type="number"
                step="0.01"
                name="debtInfo.total"
                value={formData.debtInfo?.total}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Detalhes da Infração</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="infractionDetail.description"
                value={formData.infractionDetail?.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pontos na CNH</label>
                <input
                  type="number"
                  name="infractionDetail.points"
                  value={formData.infractionDetail?.points}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                  type="text"
                  name="infractionDetail.date"
                  value={formData.infractionDetail?.date}
                  onChange={handleInputChange}
                  placeholder="DD/MM/AAAA"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <input
                  type="text"
                  name="infractionDetail.time"
                  value={formData.infractionDetail?.time}
                  onChange={handleInputChange}
                  placeholder="HH:MM:SS"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Emissão</label>
              <input
                type="text"
                name="infractionDetail.issueDate"
                value={formData.infractionDetail?.issueDate}
                onChange={handleInputChange}
                placeholder="DD/MM/AAAA"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Pagamento</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor da Multa (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="paymentInfo.fine"
                  value={formData.paymentInfo?.fine}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código PIX</label>
                <input
                  type="text"
                  name="paymentInfo.pixCode"
                  value={formData.paymentInfo?.pixCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Imagem da Infração</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload de Imagem</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB</p>
            </div>

            {imageFile && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Prévia:</p>
                <div className="w-full max-w-md h-48 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={URL.createObjectURL(imageFile) || "/placeholder.svg"}
                    alt="Prévia da imagem"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#3D9970] hover:bg-[#2d8057] text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Infração"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

