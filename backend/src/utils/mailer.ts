import nodemailer from "nodemailer";

export function createTransporter({ host, port, user, pass }: any) {
  return nodemailer.createTransport({
    host, port,
    auth: { user, pass }
  });
}

export async function sendMail(transporter: any, to: string, subject: string, html: string) {
  return transporter.sendMail({ from: "no-reply@todo.app", to, subject, html });
}
