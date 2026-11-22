// Configuración de /planes
//
// Mientras supabaseUrl y supabaseKey estén vacíos, la web funciona en
// MODO PRUEBA: los vales solo se guardan en el navegador donde los creas.
//
// Para usarla de verdad (los dos, desde cualquier móvil), pon aquí los
// datos de Supabase: botón «Connect» del proyecto, o Project Settings → API Keys.

window.PLANES_CONFIG = {
  // Ejemplo: "https://abcdefghijkl.supabase.co"
  supabaseUrl: "",

  // La clave pública: "Publishable key" (sb_publishable_...) o "anon public" (eyJ...).
  // Nunca la "secret" ni la "service_role".
  supabaseKey: "",

  // Opcional: botón «Añadir a Cartera» del iPhone. Ponlo en true cuando
  // la función pase-wallet esté creada en Supabase.
  wallet: false
};
