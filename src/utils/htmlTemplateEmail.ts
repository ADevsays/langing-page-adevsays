export const htmlTemplateEmail = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Producto Digital</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9;">
    <div class="email-container" style="max-width: 520px; width: 100%; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); color: #333333;">
        <div class="header" style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.adevsays.com/resources/minmarket/devjourney/content_presentation.webp" alt="Logo de Adevsays" style="max-width: 320px; border-radius: 12px;">
            <h1 style="margin: 15px 0 10px; color: #333333;">¡Gracias por tu compra!</h1>
        </div>
        <div class="content" style="line-height: 1.6;">
            <p>Hola ${name},</p>
            <p>En el siguiente enlace tendrás acceso a DevJourney. Podrás escoger entre todos los estilos para quedarte con el que más te guste.</p>
            <p>Luego de clonar tu plantilla, tendrás todas las herramientas listas para ser usadas.</p>
            <a href="https://adevsays.com/api/get-redirect-template" style="display: block; background-color: rgb(250 204 21); color: black; padding: 12px 0px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold; margin-top: 20px;">Acceder a la plantilla</a>
            <p>En el siguiente enlace puedes entrar a <span>Devjorney Comunity</span> donde podrás conectar con otras personas y también estaremos resolviendo dudas si tienes problemas en la instalación o configuración de la plantilla.</p>
            <a href="https://adevsays.com/api/get-redirect-chat" style="display: block; background-color: rgb(250 204 21); color: black; padding: 12px 0px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold; margin-top: 20px;">Entrar al grupo.</a>

            <small>Si en móbil alguno de los enlaces te da problema, mántenlo presionado y selecciona "abrir en navegador" </small>

        </div>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos a <a href="mailto:adevsaysinfo@gmail.com">adevsaysinfo@gmail.com</a> .</p>
        <div class="footer" style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
            <p>&copy; 2024 Adevsays.</p>
            <p><a href="https://www.adevsays.com/legal/terminos" style="color: #0077cc; text-decoration: none;">Política de privacidad</a> | <a href="https://www.adevsays.com/legal/terminos" style="color: #0077cc; text-decoration: none;">Términos y Condiciones</a></p>
        </div>
    </div>    
</body>
</html>
`;

