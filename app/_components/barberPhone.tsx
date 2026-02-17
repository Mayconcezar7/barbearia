"use client"

import { Button } from "./ui/button";
import { PhoneIcon } from "lucide-react";

interface PhoneProps {
  phone: string
}

const BarberPhone = ({ phone }: PhoneProps) => {

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone)
  }

  return (
    <div className="flex items-center justify-between">
      <div key={phone} className="flex items-center gap-2">
        <PhoneIcon fontSize={16} className="h-[16px]" />
        <p className="text-sm text-gray-400">{phone}</p>
      </div>

      <Button variant="outline" onClick={() => handleCopyPhone()}>
        Copiar
      </Button>
    </div>
  )
}

export default BarberPhone;
