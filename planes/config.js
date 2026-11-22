// Configuración de /planes

window.PLANES_CONFIG = {
  // Quién puede entrar (los mismos nombres que en setup.sql).
  personas: ["Aaron", "Lizz"],

  // Datos de Supabase: botón «Connect» del proyecto, o Project Settings → API Keys.
  // Mientras estén vacíos, la web funciona en MODO PRUEBA: los vales solo se
  // guardan en el navegador donde los creas.
  supabaseUrl: "https://rqmmutwahzllwpajpuln.supabase.co",
  // Clave pública: "Publishable key" (sb_publishable_...) o "anon public" (eyJ...).
  // Nunca la "secret" ni la "service_role".
  supabaseKey: "sb_publishable_rWfohyEFqThbZH8CFSRRWg_SX8gFR09",

  // Solo para el modo prueba: huella SHA-256 de la contraseña.
  // Con Supabase conectado, la contraseña la comprueba la base de datos.
  clavePrueba: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",

  // Botón «Añadir a Cartera» del iPhone. Funciona cuando Supabase está conectado
  // (los pases los firma WalletWallet desde la base de datos).
  wallet: true
};
