// Modal de autenticación de alta fidelidad: login + registro con RBAC local.
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, Wrench, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type Mode = "login" | "register";

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  const reset = () => {
    setEmail("");
    setPassword("");
    setError(null);
    setShowPassword(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = mode === "login" ? login(email, password) : register(email, password);
    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    if (result.role === "admin") {
      toast.success("Bienvenido, Administrador", {
        description: "Redirigiendo al Panel Predictivo de Inventario.",
      });
      handleClose();
      setTimeout(() => navigate({ to: "/admin" }), 300);
    } else {
      toast.success(mode === "login" ? "Sesión iniciada" : "Cuenta creada", {
        description: "Disfruta tu experiencia de compra en FerreInnova.",
      });
      handleClose();
      navigate({ to: "/tienda" });
    }
  };

  return (
    <div
      data-testid="auth-modal"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#0b1220] to-[#0f172a] p-6 shadow-2xl shadow-black/60 ring-1 ring-white/5"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-orange-500/60 hover:text-orange-300"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30">
            <Wrench className="h-5 w-5 text-neutral-950" strokeWidth={2.6} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-white">
              {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"} - <span className="text-orange-400">FerreInnova</span>
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-slate-400">
              {mode === "login" ? "Acceso seguro al sistema" : "Únete a la plataforma"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ferreinnova.pe"
                data-testid="input-email-login"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/60"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-testid="input-password-login"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                data-testid="btn-toggle-password"
                className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:text-orange-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div
              data-testid="alerta-error-auth"
              role="alert"
              className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            data-testid="btn-submit-login"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-neutral-950 shadow-lg shadow-orange-500/30 transition hover:from-orange-400 hover:to-amber-400"
          >
            {mode === "login" ? "Ingresar al Sistema" : "Crear mi cuenta"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "login" ? "register" : "login"));
              setError(null);
            }}
            data-testid="btn-toggle-auth-mode"
            className="block w-full text-center text-xs font-semibold text-sky-300 underline-offset-4 transition hover:text-sky-200 hover:underline"
          >
            {mode === "login"
              ? "¿No tienes cuenta? Crear una nueva cuenta / Registrarse"
              : "¿Ya tienes cuenta? Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
