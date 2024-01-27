import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="bg-pizza-image flex h-full flex-col justify-between border-r bg-muted bg-cover bg-no-repeat p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Pizza className="h-8 w-8" />
          <span className="font-semibold">pizza.shop</span>
        </div>
        <footer className="text-sm text-foreground">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
