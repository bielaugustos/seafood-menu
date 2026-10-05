// CARDÁPIO DE EXEMPLO: troque nomes, descrições e preços pelos reais do pesqueiro.
export type Product = {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number; // em BRL
};

export const CATEGORIES = ["Pesca", "Pratos", "Porções", "Bebidas"] as const;

export const MENU: Product[] = [
  { id: "f-entrada", category: "Pesca", name: "Taxa de pesca (por pessoa)", description: "Acesso ao lago para pescar", price: 30 },
  { id: "f-crianca", category: "Pesca", name: "Entrada criança (sem pesca)", description: "Acesso ao parquinho e à área de lazer", price: 10 },
  { id: "d-tilapia", category: "Pratos", name: "Tilápia frita (inteira)", description: "Acompanha arroz, feijão e salada", price: 55 },
  { id: "d-executivo", category: "Pratos", name: "Prato executivo", description: "Arroz, feijão, salada e a mistura do dia", price: 28 },
  { id: "p-iscas", category: "Porções", name: "Iscas de tilápia", description: "Porção para 2 pessoas", price: 42 },
  { id: "p-batata", category: "Porções", name: "Batata frita", description: "Porção para 2 pessoas", price: 24 },
  { id: "p-mandioca", category: "Porções", name: "Mandioca frita", description: "Porção para 2 pessoas", price: 22 },
  { id: "b-refri2l", category: "Bebidas", name: "Refrigerante 2L", price: 12 },
  { id: "b-lata", category: "Bebidas", name: "Refrigerante lata", price: 6 },
  { id: "b-agua", category: "Bebidas", name: "Água mineral", price: 4 },
];

// TAXAS DE ENTREGA DE EXEMPLO por bairro/região (só vale para a modalidade "Entrega").
export const DELIVERY_AREAS: { name: string; fee: number }[] = [
  { name: "Região próxima", fee: 8 },
  { name: "Região intermediária", fee: 12 },
  { name: "Região distante", fee: 18 },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
