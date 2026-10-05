# Peixes Encantados — pedidos online
<img width="1790" height="1793" alt="seafood-menu-weld vercel app_" src="https://github.com/user-attachments/assets/7b9841cd-c0e6-4f64-b067-eb41f14133a0" />

Next.js + Supabase. O cliente monta o carrinho, escolhe como quer receber
(**consumir no local**, **retirar no balcão** ou **entrega**), escolhe a forma de pagamento
(dinheiro, cartão ou Pix) e o pedido abre no WhatsApp do pesqueiro, já formatado.
Com a Supabase configurada, cada pedido também é salvo no banco.

## Instalação

1. `npm install`
2. Copie `.env.example` para `.env.local` e preencha:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: só dígitos, com DDI (ex.: `5511999999999`)
   - `NEXT_PUBLIC_PIX_KEY` / `NEXT_PUBLIC_PIX_NAME`
   - URL e service role key do Supabase (opcional)
3. No Supabase, rode `supabase/schema.sql` no SQL editor.
4. `npm run dev` e abra http://localhost:3000

## O que personalizar

- `lib/menu.ts`: **cardápio e taxas de exemplo (placeholder)**. Troque pelos valores reais:
  taxa de pesca, pratos, porções, bebidas e regiões de entrega.
- `app/globals.css`: cores (tema verde) e layout.
- `app/page.tsx`: texto do topo da página (horário de funcionamento, se quiser exibir).

## Modalidades de pedido

| Modalidade | Campos extras | Taxa |
|---|---|---|
| Consumir no local | onde o cliente está (mesa, quiosque) | não |
| Retirar no balcão | nenhum | não |
| Entrega | endereço e região | sim, por região |

## Segurança

- Preços e totais são recalculados no servidor (`app/api/orders/route.ts`); preços enviados pelo navegador são ignorados.
- `SUPABASE_SERVICE_ROLE_KEY` só é usada no servidor. Nunca use o prefixo `NEXT_PUBLIC_` nela.

## Próximos passos

- Painel de administração para ver pedidos e mudar o status.
- Pix dinâmico com QR code via provedor (Mercado Pago, Asaas), com confirmação automática.
- Venda de peixe pescado por quilo (peso variável, precisa de balança/conferência no local).
- Publicar na Vercel.
