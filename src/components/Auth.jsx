import { useState } from 'react'
import { supabase } from '../lib/supabase'
import compaLogo from '../assets/compa-logo.png'
import { LogIn, UserPlus, ArrowLeft } from 'lucide-react'

export default function Auth() {
  const [mode, setMode] = useState('landing')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    if (!email || !password) {
      alert('Escribe correo y contraseña')
      return
    }

    setLoading(true)

    const result =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

    if (result.error) alert(result.error.message)

    setLoading(false)
  }

  if (mode === 'landing') {
    return (
      <main className="min-h-screen bg-[#F8F1E3] px-4 py-8 font-[Inter,ui-sans-serif,system-ui] text-[#14251B]">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm">
            <img src={compaLogo} alt="Compagro" className="h-32 w-32 object-contain" />
          </div>

          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#155C35]/70">
            Compagro
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#155C35] sm:text-5xl">
            Tu compa operativo con IA
          </h1>

          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-black/55">
            Registra tu operación, controla inventario, conecta mensajes de campo y recibe alertas inteligentes desde un solo panel.
          </p>

          <div className="mt-8 grid w-full max-w-md gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#155C35] px-5 py-4 font-black text-white shadow-sm transition active:scale-[.98]"
            >
              <UserPlus size={20} />
              Registrar
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#155C35]/20 bg-white px-5 py-4 font-black text-[#155C35] shadow-sm transition active:scale-[.98]"
            >
              <LogIn size={20} />
              Iniciar sesión
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F1E3] px-4 py-8 font-[Inter,ui-sans-serif,system-ui] text-[#14251B]">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <button
          onClick={() => setMode('landing')}
          className="mb-5 inline-flex items-center gap-2 font-black text-[#155C35]"
        >
          <ArrowLeft size={18} />
          Regresar
        </button>

        <div className="rounded-[28px] border border-[#E8DDC9] bg-[#FFFCF5] p-6 shadow-[0_18px_50px_rgba(31,92,59,0.06)]">
          <div className="mb-6 flex items-center gap-3">
            <img src={compaLogo} alt="Compagro" className="h-16 w-16 object-contain" />
            <div>
              <h1 className="text-3xl font-black text-[#155C35]">Compagro</h1>
              <p className="font-semibold text-[#14251B]/60">
                {mode === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}
              </p>
            </div>
          </div>

          <label className="mb-3 block">
            <span className="mb-2 block text-sm font-extrabold text-[#155C35]">Correo</span>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-[#E8DDC9] bg-white px-4 py-4 outline-none focus:border-[#155C35]"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-extrabold text-[#155C35]">Contraseña</span>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#E8DDC9] bg-white px-4 py-4 outline-none focus:border-[#155C35]"
            />
          </label>

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full rounded-2xl bg-[#155C35] px-5 py-4 font-black text-white disabled:opacity-60"
          >
            {loading
              ? 'Cargando...'
              : mode === 'login'
                ? 'Iniciar sesión'
                : 'Crear cuenta'}
          </button>

          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="mt-4 w-full rounded-2xl border border-[#155C35]/20 bg-white px-5 py-4 font-black text-[#155C35]"
          >
            {mode === 'login' ? 'No tengo cuenta, registrarme' : 'Ya tengo cuenta, iniciar sesión'}
          </button>
        </div>
      </section>
    </main>
  )
}