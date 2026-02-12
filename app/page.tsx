import { Search } from "lucide-react"
import { Button } from "../app/_components/ui/button"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"

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

          <Card className="pl-3">
            <CardContent className="flex p-0">
                <div className="flex flex-col  justify-between gap-3 py-5 w-full">
                    <Badge className="w-fit">Confirmado</Badge>

                    <p className="text-2xl font-bold"> Corte de Cabelo</p>

                    <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" alt="perfil da barbearia" />
                        </Avatar>
                        <p className="text-sm">Vintage Barber</p>

                    </div>

                </div>

                <div className="flex flex-col items-center justify-center border-l border-solid p-5">
                    <p className="text-sm">Fevereiro</p>
                    <p className=" text-3xl ">12</p>
                    <p className="text-sm">10:30</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
