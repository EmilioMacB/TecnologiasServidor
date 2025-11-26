import { Request, Response } from 'express';
import { transporter } from './mailer';

export const renderForm = (req: Request, res: Response) => {
    res.render('santa'); 
};

// Procesa el envío del formulario
export const sendSantaLetter = async (req: Request, res: Response) => {
    // Desestructuramos los datos que vienen del formulario
    // "email" y "carta" son los atributos 'name' de los inputs en el HTML
    const { email, carta } = req.body;

    // Validación 
    if (!email || !carta) {
        return res.status(400).send("Faltan datos: Por favor llena todos los campos.");
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: email,                    
            subject: 'Cartita a santa desde la Tarea 4 🎅',
            html: `
                <div style="background-color: #f0f0f0; padding: 20px; font-family: sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; border: 2px solid #d42426;">
                        <h1 style="color: #d42426; text-align: center;">¡Jo Jo Jo! 🎄</h1>
                        <p style="font-size: 16px;">Se recibio una cartita desde la applicacion de la tarea 4!!!</p>
                        
                        <hr style="border: 1px dashed #ccc; margin: 20px 0;">
                        
                        <h3 style="color: #2c3e50;">La carta dice asi:</h3>
                        <blockquote style="background: #e8f4f8; padding: 15px; border-left: 5px solid #3498db; font-style: italic;">
                            ${carta}
                        </blockquote>

                        <hr style="border: 1px dashed #ccc; margin: 20px 0;">
                        
                        <p style="font-size: 12px; color: #7f8c8d; text-align: center;">
                            Este mensaje se mando con exito desde la tarea 4, esperemos que se cumpla todo lo que se pidio! 🎁
                        </p>
                    </div>
                </div>
            `
        });
        // Si todo sale bien...

        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: green;">¡Carta enviada con éxito! 🎁</h1>
                <p>Se ha enviado una copia a: <strong>${email}</strong></p>
                <a href="/" style="padding: 10px 20px; background: #d42426; color: white; text-decoration: none; border-radius: 5px;">Volver</a>
            </div>
        `);

    } catch (error) {
        console.error("Error enviando correo:", error);
        res.status(500).send("Hubo un error al intentar enviar la carta. Revisa la consola.");
    }
};