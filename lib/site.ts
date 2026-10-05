// Informações usadas na landing page. Preencha o que estiver vazio:
// campos vazios simplesmente não aparecem no site.
export const SITE = {
  name: "Pesqueiro Reino Encantado",

  // Vem do .env.local (NEXT_PUBLIC_WHATSAPP_NUMBER). Sem ele, o botão de WhatsApp não aparece.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",

  // Nota e número de avaliações exibidos no topo (conferir no Google Maps de vez em quando).
  rating: 4.3,
  reviewCount: 642,

  // Exemplos: "Estrada do Pesqueiro, km 3, Cidade - SP"
  address: "",
  // Exemplos: "Todos os dias, das 8h às 18h"
  hours: "",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Pesqueiro Reino Encantado"),
};
