/**
 * Cliente HTTP do app: access token em memória/localStorage, renovação
 * automática via cookie httpOnly quando o access token expira.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

const CHAVE_TOKEN = "radar.accessToken";
const CHAVE_USUARIO = "radar.usuario";

export interface UsuarioSessao {
  sub: string;
  tenantId: string;
  papel: "ADMIN" | "CORRETOR" | "FINANCEIRO";
  nome: string;
}

export function tokenAtual(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CHAVE_TOKEN);
}

export function usuarioAtual(): UsuarioSessao | null {
  if (typeof window === "undefined") return null;
  const bruto = window.localStorage.getItem(CHAVE_USUARIO);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto) as UsuarioSessao;
  } catch {
    return null;
  }
}

export function salvarSessao(accessToken: string, usuario: UsuarioSessao): void {
  window.localStorage.setItem(CHAVE_TOKEN, accessToken);
  window.localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export function limparSessao(): void {
  window.localStorage.removeItem(CHAVE_TOKEN);
  window.localStorage.removeItem(CHAVE_USUARIO);
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    mensagem: string,
    public readonly corpo?: unknown,
  ) {
    super(mensagem);
  }
}

async function tentarRenovar(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/auth/renovar`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return false;
    const corpo = (await res.json()) as { accessToken: string; usuario: UsuarioSessao };
    salvarSessao(corpo.accessToken, corpo.usuario);
    return true;
  } catch {
    return false;
  }
}

export async function api<T = unknown>(
  caminho: string,
  opcoes: RequestInit & { corpo?: unknown } = {},
): Promise<T> {
  const executar = async (): Promise<Response> => {
    const { corpo, headers, ...resto } = opcoes;
    return fetch(`${API_URL}${caminho}`, {
      ...resto,
      credentials: "include",
      headers: {
        ...(corpo !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(tokenAtual() ? { Authorization: `Bearer ${tokenAtual()}` } : {}),
        ...headers,
      },
      ...(corpo !== undefined ? { body: JSON.stringify(corpo) } : {}),
    });
  };

  let res = await executar();
  if (res.status === 401 && (await tentarRenovar())) {
    res = await executar();
  }
  if (res.status === 401) {
    limparSessao();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new ApiError(401, "Sessão expirada");
  }
  const texto = await res.text();
  const corpo = texto ? (JSON.parse(texto) as unknown) : null;
  if (!res.ok) {
    const mensagem =
      corpo && typeof corpo === "object" && "message" in corpo
        ? String((corpo as { message: unknown }).message)
        : `Erro ${res.status}`;
    throw new ApiError(res.status, mensagem, corpo);
  }
  return corpo as T;
}

/** Envio multipart (upload de arquivos). */
export async function apiUpload<T = unknown>(caminho: string, form: FormData): Promise<T> {
  const res = await fetch(`${API_URL}${caminho}`, {
    method: "POST",
    credentials: "include",
    headers: tokenAtual() ? { Authorization: `Bearer ${tokenAtual()}` } : {},
    body: form,
  });
  const texto = await res.text();
  const corpo = texto ? (JSON.parse(texto) as unknown) : null;
  if (!res.ok) {
    const mensagem =
      corpo && typeof corpo === "object" && "message" in corpo
        ? String((corpo as { message: unknown }).message)
        : `Erro ${res.status}`;
    throw new ApiError(res.status, mensagem, corpo);
  }
  return corpo as T;
}
