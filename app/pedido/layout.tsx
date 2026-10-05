import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça seu pedido | Pesqueiro Reino Encantado",
};

export default function PedidoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
