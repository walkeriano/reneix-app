import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const { nombreUsuario, email, codigoAcceso, movil, direccion, pais } = body;

    await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Reneix App - Mentoría Rehaz tu vida",

      html: `
      <h2>Hola ${nombreUsuario}, bienvenida a la mentoría Rehaz tu vida</h2>
      <p>En Reneix App encontrarás todos los detalles importantes sobre tu mentoría, el planeamiento de sesiones, acceso a las videollamadas, interacción directa con Àngels Córcoles, comunidad de pacientes y mucho más!</p>
      <hr>
      <p>Paciente registrado</p>
      <p><b>Nombre:</b> ${nombreUsuario}</p>
      <p><b>Móvil:</b> ${movil}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Dirección:</b> ${direccion}</p>
      <p><b>País:</b> ${pais}</p>
      <hr>
      <p>Credenciales de acceso</p>
      <p><b>Correo de acceso:</b> ${email}</p>
      <p><b>Código de acceso:</b> ${codigoAcceso}</p>
      <hr>
      <p><b>Acceso Reneix App:</b></p>
      <a href="https://www.angelscorcoles.com/">
        angelscorcoles.com/sesion-usuario
      </a>
      <br><br>
      <p>Puedes iniciar sesión cuando desees.</p>
      <p>RENEIX APP / ÀNGELS CÓRCOLES - COPYRIGHT 2026@</p>
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
