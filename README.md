# 🐱 Galería Gato

Galería de fotos privada para Android (y cualquier navegador moderno), hecha en honor a mi gato.

**Abrir:** https://alfredojosempineda-glitch.github.io/galeria-gato/

En Chrome para Android, toca ⋮ → **Instalar app** (o "Agregar a la pantalla principal") para usarla como una app.

## Qué hace
- Agrega fotos desde el teléfono y las agrupa por **color** y por **rostros** (personas).
- Editor: **Auto** (mejora de luz y color), **Enfoque**, **Grano** y **Quitar fondo** (transparente, color, desenfocado u otra foto).
- Guarda copias y descarga resultados.
- Funciona sin conexión después de la primera carga.

## Privacidad
Tus fotos **nunca salen del teléfono**: todo se procesa en el navegador y se guarda localmente (IndexedDB). No hay servidor ni cuentas.

## Créditos y licencias
- Rostros: [face-api (@vladmandic)](https://github.com/vladmandic/face-api), licencia MIT.
- Quitar fondo: modelo [RMBG-1.4 de BRIA AI](https://huggingface.co/briaai/RMBG-1.4) (~44 MB, se descarga la primera vez que lo usas), con [onnxruntime-web](https://github.com/microsoft/onnxruntime). **La licencia de RMBG-1.4 solo permite uso no comercial.**
