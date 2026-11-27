/* ==========================================================
   DATOS DE LA INVITACIÓN — edita solo este archivo
   Todo lo que ves en la invitación sale de aquí.
   ========================================================== */
window.INVITACION = {
  titulo: "Mi Primera Comunión",
  nombre: "Briana",

  // Fecha y hora de la ceremonia (hora de Perú, UTC-5). La usa la cuenta regresiva.
  fechaISO: "2026-12-06T12:00:00-05:00",
  fechaTexto: "Domingo 6 de diciembre de 2026",
  fechaCorta: "06 · 12 · 2026",
  horaTexto: "12:00 m.",

  // Fotos: guarda tus fotos en la carpeta assets/fotos con estos nombres.
  // Si una foto no existe, se muestra un marco elegante en su lugar.
  fotoPortada: "assets/fotos/portada.jpg", // Briana de blanco con su hermanito
  fotoFinal: "assets/fotos/final.jpg",     // Briana de bebé
  galeria: [
    { src: "assets/fotos/foto-1.jpg", alt: "Briana bailando marinera con vestido blanco" },
    { src: "assets/fotos/foto-2.jpg", alt: "Briana con su perrita Saki" },
    { src: "assets/fotos/foto-3.jpg", alt: "Briana con una corona de flores rojas" },
    { src: "assets/fotos/foto-4.jpg", alt: "Briana en la juguetería" },
    { src: "assets/fotos/foto-5.jpg", alt: "Briana en el Centro de Lima" },
    { src: "assets/fotos/foto-6.jpg", alt: "Briana sonriendo" }
  ],

  momentosEspeciales: [],

  // Mensaje de Briana (cada línea es un párrafo)
  mensaje: [
    "¡Hola, soy Briana!",
    "Este año recibiré mi Primera Comunión en la parroquia cerca a mi casita, con el apoyo de mi familia: mis papitos y mi hermanito.",
    "Fui a la catequesis casi todos los domingos y ahora termino esta etapa con mucha alegría, porque por fin podré comulgar. Aún debo seguir aprendiendo la Palabra de Dios, pero este es un hermoso inicio.",
    "Me encantará que me acompañes en mi Primera Comunión y que luego vengas a celebrar con nosotros en mi hogar."
  ],

  padres: [
    { rol: "Mi papito", nombre: "Bruno Ramirez" },
    { rol: "Mi mamita", nombre: "Ilda Atencia" }
  ],
  hermanos: [
    { rol: "Mi hermanito", nombre: "Aizen Ramirez Atencia", detalle: "" }
  ],
  padrinos: [
    { rol: "Mi padrino", nombre: "Manuel Alejandro Portilla" },
    { rol: "Mi madrina", nombre: "Martha Iparraguirre" }
  ],

  ceremonia: {
    lugar: "Parroquia San Francisco Javier",
    zona: "Ca. Parque El Rosedal S/N, Callao",
    texto: "Mi Primera Comunión será el domingo 6 de diciembre al mediodía, en punto, en la Parroquia San Francisco Javier. ¡Te espero con mucho cariño!"
  },

  celebracion: {
    titulo: "Después de la misa",
    lugar: "",
    direccion: "", // por seguridad no se muestra la dirección de la casa
    nota: "Mi hogar está a pocos metros de la parroquia",
    pasos: [
      { titulo: "Intercambio de estampitas", texto: "El famoso intercambio, a la salida de la parroquia." },
      { titulo: "Fotitos", texto: "Para guardar este día en nuestros recuerdos." },
      { titulo: "Almuerzo en mi casa", texto: "Pasaremos a mi hogar a celebrar juntos." }
    ],
    texto: []
  },

  // ENLACE DE GOOGLE MAPS de la parroquia (la casa no se publica por seguridad).
  mapas: {
    parroquia: {
      titulo: "La ceremonia",
      lugar: "Parroquia San Francisco Javier",
      direccion: "Ca. Parque El Rosedal S/N, Callao",
      url: "https://www.google.com/maps/search/?api=1&query=XVPX%2B566%2C+Ca.+Parque+El+Rosedal+S%2FN%2C+Callao+07036"
    }
  },

  // Música: Preludio en Do mayor de J. S. Bach (BWV 846, dominio público), arreglo original.
  // Nunca suena sola. Si el archivo no existe, el botón de música no aparece.
  musica: "assets/musica/cancion.mp3",

  posdata: "",

  mensajeFinal: "Tu compañía hará que este día sea aún más especial. ¡Te espero con mucho cariño para celebrar juntos!"
};
