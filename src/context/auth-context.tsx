// Contexto de autenticación local (sin backend) con roles admin/client.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "client";

export interface AuthUser {
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: true; role: Role } | { ok: false; error: string };
  register: (email: string, password: string) => { ok: true; role: Role } | { ok: false; error: string };
  logout: () => void;
}

const STORAGE_KEY = "ferreinnova.auth.user";
const ADMIN_EMAIL = "admin@ferreinnova.pe";
const ADMIN_PASSWORD = "Admin123*";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const login: AuthContextValue["login"] = (email, password) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !password) return { ok: false, error: "Completa correo y contraseña." };
    if (trimmed === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) {
        return { ok: false, error: "Credenciales de administrador inválidas." };
      }
      const u: AuthUser = { email: trimmed, role: "admin" };
      persist(u);
      return { ok: true, role: "admin" };
    }
    const u: AuthUser = { email: trimmed, role: "client" };
    persist(u);
    return { ok: true, role: "client" };
  };

  const register: AuthContextValue["register"] = (email, password) => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes("@")) return { ok: false, error: "Correo electrónico inválido." };
    if (password.length < 6) return { ok: false, error: "La contraseña debe tener al menos 6 caracteres." };
    if (trimmed === ADMIN_EMAIL) return { ok: false, error: "Ese correo está reservado." };
    const u: AuthUser = { email: trimmed, role: "client" };
    persist(u);
    return { ok: true, role: "client" };
  };

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
