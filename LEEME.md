# Invitación de la Primera Comunión de Briana

## El enlace para invitar

**https://projectnow2025.github.io/primera-comunion-briana/**

Ese es el que se manda por WhatsApp. Se abre desde cualquier celular, sin cuenta
y sin contraseña. Lleva una marca «noindex», así que no aparece en Google: solo
entra quien tenga el enlace.

- **Primera Comunión:** domingo 6 de diciembre de 2026, 12:00 del mediodía,
  Parroquia San Francisco Javier (Callao).
- Después de la misa: intercambio de estampitas, fotos y almuerzo en casa.

Es una sola página: el sobre que se abre al tocarlo, la cuenta regresiva, la
familia, la galería de fotos, la ceremonia, los tres momentos de la celebración
y el mapa de la parroquia.

**La invitación del bautizo es otra, aparte:** vive en
`Documents\Claude_proyectos\programa_briana` y se publica en
https://projectnow2025.github.io/bautizo-briana/. Son dos webs distintas, cada
una con su carpeta y su repositorio; cambiar una no toca la otra.

## Enlaces con el nombre de cada invitada

**https://projectnow2025.github.io/primera-comunion-briana/generador.html**

Escribes el nombre de la familia y cuántos pases le reservas, y te da un enlace
propio con un botón para enviarlo por WhatsApp. Al abrirlo, la invitación saluda
con su nombre en el sobre. Esa página no sale en buscadores y la lista de
enlaces que creas se guarda solo en el equipo donde la usas.

## Cambiar algo

Todo el contenido está en un solo archivo: `js/config.js` — nombres, fechas,
textos, el enlace del mapa y la lista de fotos. No hace falta tocar nada más.

- **Fotos:** van en `assets/fotos`. Si falta una, sale un marco elegante en su lugar.
- **Música:** `assets/musica/cancion.mp3`, el Preludio en Do mayor de Bach.
  Empieza sola en cuanto tocan el sobre, y el botón de la esquina sirve para
  silenciarla. No puede sonar antes de ese toque: los navegadores del celular
  solo dejan sonar el audio que nace de un toque de la persona, y si una página
  lo intenta al cargar, la silencian sin avisar.
- **La dirección de la casa no se publica**, a propósito: solo dice que está
  a pocos metros de la parroquia.

Después de editar, esto sube el cambio y la web se actualiza sola en un minuto:

```powershell
git add -A; if ($?) { git commit -m "Cambios en la invitacion" }; if ($?) { git push }
```

## Dónde está publicada y por qué

Está en GitHub Pages, no en Vercel, por el mismo motivo que la del bautizo: el
26 de noviembre de 2026 Vercel rechazaba todos los despliegues del equipo
`project-now` con «Payment required · DEPLOYMENT_DISABLED».

El repositorio es `projectnow2025/primera-comunion-briana` y es **público**,
porque GitHub Pages gratuito solo publica repositorios públicos. La web igual no
sale en buscadores, pero el repositorio sí se puede ver desde tu perfil.
