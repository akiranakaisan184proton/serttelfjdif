"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"

interface PixQRCodeProps {
  pixCode: string
  size?: number
}

export default function PixQRCode({ pixCode, size = 128 }: PixQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(pixCode, {
          width: size,
          margin: 1,
          color: {
            dark: "#333333",
            light: "#FFFFFF",
          },
        })
        setQrCodeUrl(url)
      } catch (err) {
        console.error("Erro ao gerar QR Code:", err)
      }
    }

    generateQRCode()
  }, [pixCode, size])

  if (!qrCodeUrl) {
    return (
      <div className="w-32 h-32 bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#3D9970] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-32 h-32 bg-white flex items-center justify-center">
      <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code PIX" width={size} height={size} />
    </div>
  )
}

