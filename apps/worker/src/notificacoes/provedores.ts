/**
 * Notificações via adapter pattern (requisito da stack):
 * - EmailProvider implementado (Resend se RESEND_API_KEY; senão SMTP via SMTP_URL).
 * - WhatsAppProvider como interface + stub atrás de FEATURE_WHATSAPP
 *   (TODO: API oficial Meta Cloud — fora do escopo da Fase 0).
 */
import nodemailer from "nodemailer";

export interface MensagemEmail {
  para: string;
  assunto: string;
  corpo: string;
  /** Nome exibido do remetente — sempre a corretora, nunca a plataforma. */
  nomeRemetente: string;
}

export interface EmailProvider {
  enviar(mensagem: MensagemEmail): Promise<void>;
}

export class ResendProvider implements EmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly enderecoRemetente: string,
  ) {}

  async enviar(mensagem: MensagemEmail): Promise<void> {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${mensagem.nomeRemetente} <${this.enderecoRemetente}>`,
        to: [mensagem.para],
        subject: mensagem.assunto,
        text: mensagem.corpo,
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend respondeu ${res.status}: ${await res.text()}`);
    }
  }
}

export class SmtpProvider implements EmailProvider {
  private readonly transporte: nodemailer.Transporter;

  constructor(
    smtpUrl: string,
    private readonly enderecoRemetente: string,
  ) {
    this.transporte = nodemailer.createTransport(smtpUrl);
  }

  async enviar(mensagem: MensagemEmail): Promise<void> {
    await this.transporte.sendMail({
      from: { name: mensagem.nomeRemetente, address: this.enderecoRemetente },
      to: mensagem.para,
      subject: mensagem.assunto,
      text: mensagem.corpo,
    });
  }
}

export function provedorEmailDoAmbiente(): EmailProvider {
  const remetente = process.env.EMAIL_REMETENTE ?? "cobranca@radar.local";
  if (process.env.RESEND_API_KEY) {
    return new ResendProvider(process.env.RESEND_API_KEY, remetente);
  }
  if (process.env.SMTP_URL) {
    return new SmtpProvider(process.env.SMTP_URL, remetente);
  }
  throw new Error("Configure RESEND_API_KEY ou SMTP_URL para envio de e-mail");
}

// ---------- WhatsApp (stub, Fase 0) ----------

export interface MensagemWhatsApp {
  para: string;
  corpo: string;
}

export interface WhatsAppProvider {
  enviar(mensagem: MensagemWhatsApp): Promise<void>;
}

export class WhatsAppStubProvider implements WhatsAppProvider {
  async enviar(_mensagem: MensagemWhatsApp): Promise<void> {
    if (process.env.FEATURE_WHATSAPP !== "true") {
      throw new Error("Canal WhatsApp desabilitado (FEATURE_WHATSAPP=false)");
    }
    // TODO(Fase 0+): integrar API oficial Meta Cloud (templates aprovados,
    // webhook de respostas). Por ora o stub só registra a intenção.
    console.log("[whatsapp-stub] envio simulado (integração Meta pendente)");
  }
}
