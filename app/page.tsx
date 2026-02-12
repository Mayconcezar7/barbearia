import { Search } from "lucide-react"
import { Button } from "../app/_components/ui/button"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Header />

      <div className="my-6 flex flex-col gap-1 p-5">
        <h2 className="text-xl font-bold">Olá, Maycon</h2>
        <p className="font-normal">Quinta-feira , 12, Fevereiro</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Buscar" />
          <Button size="icon">
            <Search />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt=""
            src="/banner.webp"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div>
          <h3 className="mt-6 text-gray-500">AGENDAMENTOS</h3>
        </div>
      </div>
    </>
  )
}
