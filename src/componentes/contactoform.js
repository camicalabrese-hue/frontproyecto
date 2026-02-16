'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        const formData = new FormData(e.target);
        const datos = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            comentario: formData.get('comentario'),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/contacto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos),
            });

            if (res.ok) {
                setEnviado(true);
                e.target.reset();
            } else {
                setError(true);
            }
        } catch (err) {
            setEnviado(true);
            e.target.reset();
        }
    };

    return (
        <>
            {enviado && (
                <div style={{
                    backgroundColor: '#d4edda',
                    border: '1px solid #28a745',
                    color: '#155724',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    fontSize: '14px'
                }}>
                    ¡Mensaje enviado correctamente!
                </div>
            )}
            {error && (
                <div style={{
                    backgroundColor: '#fff3f3',
                    border: '1px solid #ff3131',
                    color: '#ff3131',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    fontSize: '14px'
                }}>
                    Hubo un error al enviar. Intentá nuevamente.
                </div>
            )}
            <form onSubmit={handleSubmit} className="formulario">
                <p>
                    <label>Nombre</label>
                    <input type="text" name="nombre" required />
                </p>
                <p>
                    <label>Email</label>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>Teléfono</label>
                    <input type="tel" name="telefono" />
                </p>
                <p>
                    <label>Comentario</label>
                    <textarea name="comentario" required></textarea>
                </p>
                <p className="centrar">
                    <input type="submit" value="Enviar" />
                </p>
            </form>
        </>
    );
}