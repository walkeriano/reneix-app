import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const { nombreUsuario, email, codigoAcceso, linkVideollamada } = body;

    await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Bienvenida a Rehaz tu vida",

      html: `
      <h2>Hola ${nombreUsuario}</h2>
      <p>Tu psicóloga ha creado tu cuenta.</p>
      <hr>
      <p><b>Correo de acceso:</b> ${email}</p>
      <p><b>Código de acceso:</b> ${codigoAcceso}</p>
      <p><b>Videollamada:</b></p>
      <a href="${linkVideollamada}">
        ${linkVideollamada}
      </a>
      <br><br>
      <p>Puedes iniciar sesión cuando desees.</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo enviar el correo",
      },
      {
        status: 500,
      },
    );
  }
}
