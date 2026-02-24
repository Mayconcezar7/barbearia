import BarbershopItem from "../_components/barbershopItem"
import Header from "../_components/header"
import Search from "../_components/search"
import Title from "../_components/title"
import { db } from "../_lib/prisma"

interface BarberShopProps {
  searchParams: {
    title?: string,
    service?: string
  }
}

const BarberShopPage = async ({ searchParams }: BarberShopProps) => {
    
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [

        searchParams?.title ? {
          name: {
            contains: searchParams?.service,
             mode: "insensitive"
          }
        }:{},

        searchParams?.service ? {
          services:{
            some: {
              name: {
                contains: searchParams?.service
              }
            }
          }
        }:{}
      ]
    },
  })

  return (
    <div >
      <Header />
      <div className="my-6 px-5">
        <Search/>
      </div>
      <div className="pl-5">
        <Title title={`Resultados para "${searchParams?.title || searchParams.service}".`} />
      </div>

   

      {
        barbershops.length === 0 ? (<div className=" my-2 mt-[30%] h-full w-full flex justify-center items-center text-gray-400"><h2 className="text-xl w-[80%] text-center">Serviço ou Barbearia não encontrado!!!</h2></div>):(

          <div className="grid grid-cols-2 gap-4 px-5">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        )
      }



      



    </div>
  )
}

export default BarberShopPage
