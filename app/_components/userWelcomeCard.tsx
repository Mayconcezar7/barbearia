"use client"

import { format } from "date-fns"
import { authClient } from "../_lib/auth-client"
import { ptBR } from "date-fns/locale/pt-BR"

const UserWelcomeCard = () => {
  const { data: session } = authClient.useSession()

  return (
    <div>
      {session ? (
        <h2 className="text-xl font-normal">
          Olá, <span className="font-bold">{session.user.name}</span>
        </h2>
      ) : (
        <h2 className="text-xl font-normal">
          Olá, <span className="font-bold">faça o seu Login!</span>
        </h2>
      )}
      <p className="font-normal capitalize">
        {format(new Date(), "EEEE,  dd 'de' MMMM", { locale: ptBR })}
      </p>
    </div>
  )
}

export default UserWelcomeCard
