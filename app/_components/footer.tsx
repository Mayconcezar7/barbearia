import { Card } from "./ui/card"
import { CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer className="mt-5">
      <Card className="rounded-none">
        <CardContent className="px-5 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 Copyright FSW Barber
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
