// Importe du contenu du fichier texte comme une chaîne de caractères
import keys from "../keys.txt";

export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get("User-Agent") || "";

    // Si ce n'est pas du curl ou du wget, on affiche un message poli mais ferme
    if (!userAgent.includes("curl")) {
      return new Response("Accès réservé.", { status: 403 });
    }
    
    return new Response(keys, {
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
        // Empêcher la mise en cache pour toujours avoir les dernières clés
        "Cache-Control": "no-store, no-cache, must-revalidate",
        // Permettre l'accès depuis n'importe quel domaine (CORS)
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};