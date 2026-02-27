"use client"

import { authClient } from "../_lib/auth-client"



const UserWelcomeCard = () => {
    const { data: session } = authClient.useSession()

  return (
    <div> 
      {
        session ? (
            <h2 className="text-xl font-normal">Olá, <span className="font-bold">{session.user.name}</span></h2>
        ):(
            <h2 className="text-xl font-normal">Olá, <span className="font-bold">faça o seu Login!</span></h2>
        )
      }
      <p className="font-normal">Quinta-feira , 12, Fevereiro</p>
    </div>
  )
}

export default UserWelcomeCard
