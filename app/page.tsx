import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import "./landing.css";
import { CATEGORIES, MENU, brl } from "@/lib/menu";
import { SITE } from "@/lib/site";

// Fotos reais: coloque arquivos .jpg/.png/.webp em public/fotos e a seção aparece sozinha.
function listPhotos(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "fotos");
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort()
      .slice(0, 9)
      .map((f) => `/fotos/${f}`);
  } catch {
    return [];
  }
}

const STALKS = [
  { x: 1086, top: 170 },
  { x: 1116, top: 84 },
  { x: 1148, top: 132 },
  { x: 1182, top: 52 },
];

function Palhoca({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-2.5" y="-34" width="5" height="36" fill="#4a3a22" />
      <path d="M-44 -30 L0 -66 L44 -30 Q0 -40 -44 -30Z" fill="#c99a45" />
      <path d="M-44 -30 Q0 -40 44 -30" fill="none" stroke="#8f6a2a" strokeWidth="2.5" />
    </g>
  );
}

function Landscape() {
  return (
    <svg
      className="lp-landscape"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 420V250C140 215 250 245 380 228C520 210 600 262 760 240C900 220 1030 190 1200 235V420Z"
        fill="#c5dac8"
      />
      <path
        d="M0 420V318C160 290 280 330 450 312C610 296 700 335 860 322C1000 310 1100 290 1200 318V420Z"
        fill="#aac7ae"
      />
      <path
        d="M0 420V372C200 360 420 384 640 372C860 360 1020 382 1200 368V420Z"
        fill="#8fb594"
      />
      <g className="lp-detail">
        <Palhoca x={720} y={376} s={0.7} />
        <Palhoca x={870} y={372} />
        <Palhoca x={1000} y={382} s={0.8} />
        {STALKS.map(({ x, top }, i) => (
          <g key={x}>
            <line x1={x} y1={400} x2={x} y2={top} stroke="#1f4a2c" strokeWidth="9" strokeLinecap="round" />
            {Array.from({ length: Math.floor((400 - top) / 56) }, (_, k) => (
              <line
                key={k}
                x1={x - 5}
                x2={x + 5}
                y1={400 - (k + 1) * 56}
                y2={400 - (k + 1) * 56}
                stroke="#5d9468"
                strokeWidth="2"
              />
            ))}
            {[0, 1, 2].map((k) => {
              const y = top + 14 + k * 26;
              const dir = (i + k) % 2 === 0 ? 1 : -1;
              return (
                <path
                  key={k}
                  d={`M${x} ${y} q${dir * 30} -16 ${dir * 62} -2 q${dir * -28} 16 ${dir * -62} 2z`}
                  fill="#2f6a3d"
                />
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
}

function Title({ mirror = false }: { mirror?: boolean }) {
  const content = (
    <>
      <span className="lp-title-sub">Pesqueiro</span>{" "}
      <span className="lp-title-line">Reino</span>{" "}
      <span className="lp-title-line">Encantado</span>
    </>
  );
  return mirror ? (
    <div className="lp-title lp-title-mirror" aria-hidden="true">
      {content}
    </div>
  ) : (
    <h1 className="lp-title">{content}</h1>
  );
}

const FACTS = [
  {
    title: "Lago de pesca",
    text: "Pesque no seu ritmo, com mesas e sombra à beira da água.",
  },
  {
    title: "Parquinho para as crianças",
    text: "Brinquedos de madeira e areia para a criançada gastar energia enquanto você pesca.",
  },
  {
    title: "Comida saborosa, preços acessíveis",
    text: "É o que os visitantes mais elogiam. Peça da sua mesa, sem sair do lugar.",
  },
  {
    title: "Entrada acessível",
    text: "O local está marcado no Google Maps com entrada para cadeira de rodas.",
  },
];

const STEPS = [
  {
    title: "Monte o pedido",
    text: "Escolha pratos, porções e bebidas no cardápio.",
  },
  {
    title: "Diga como quer receber",
    text: "Consumir no local, retirar no balcão ou receber em casa.",
  },
  {
    title: "Envie pelo WhatsApp",
    text: "O pedido chega pronto para a equipe. Pague em dinheiro, cartão ou Pix.",
  },
];

export default function Landing() {
  const photos = listPhotos();
  const rating = SITE.rating.toLocaleString("pt-BR");
  const filledStars = Math.round(SITE.rating);
  const whatsappLink = SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Olá! Vim pelo site do ${SITE.name}.`)}`
    : null;

  return (
    <div className="lp">
      {/* Filtro que faz o reflexo do título ondular de leve */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <filter id="lp-ripple" x="-5%" y="0" width="110%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.09" numOctaves="1" seed="3" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="14s"
              values="0.004 0.09;0.007 0.12;0.004 0.09"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <header className="lp-hero">
        <div className="lp-sky">
          <Landscape />
          <div className="lp-inner lp-sky-body">
            <nav className="lp-nav" aria-label="Principal">
              <span className="lp-brand">{SITE.name}</span>
              <div className="lp-nav-links">
                <a className="lp-nav-link" href="#cardapio">
                  Cardápio
                </a>
                <a className="lp-nav-link" href="#visita">
                  Como chegar
                </a>
                <Link className="lp-btn lp-btn-dark lp-btn-small" href="/pedido">
                  Fazer pedido
                </Link>
              </div>
            </nav>
            <div className="lp-title-wrap">
              <Title />
            </div>
          </div>
        </div>

        <div className="lp-water">
          <div className="lp-inner">
            <div className="lp-reflect" aria-hidden="true">
              <Title mirror />
            </div>
            <p className="lp-lead">
              Lago de pesca em meio ao verde, com parquinho para as crianças e comida saborosa. Peça da sua
              mesa, retire no balcão ou receba em casa.
            </p>
            <div className="lp-cta">
              <Link className="lp-btn lp-btn-primary" href="/pedido">
                Fazer pedido
              </Link>
              {whatsappLink ? (
                <a className="lp-btn lp-btn-ghost" href={whatsappLink} target="_blank" rel="noreferrer">
                  Chamar no WhatsApp
                </a>
              ) : (
                <a className="lp-btn lp-btn-ghost" href="#cardapio">
                  Ver cardápio
                </a>
              )}
            </div>
            <p className="lp-rating">
              <span className="lp-stars" aria-hidden="true">
                {"★".repeat(filledStars)}
                {"☆".repeat(5 - filledStars)}
              </span>
              <span>
                {rating} de 5 em {SITE.reviewCount} avaliações no Google
              </span>
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="lp-section" id="sobre">
          <div className="lp-inner lp-split">
            <div>
              <h2 className="lp-h2">Um dia ao ar livre, sem pressa</h2>
              <p className="lp-intro">
                O pesqueiro fica em meio ao verde, com lago, sombra e mesas à beira da água. Dá para pescar,
                almoçar e deixar as crianças brincando.
              </p>
            </div>
            <dl className="lp-facts">
              {FACTS.map((f) => (
                <div className="lp-fact" key={f.title}>
                  <dt className="lp-fact-title">{f.title}</dt>
                  <dd className="lp-fact-text">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="lp-section lp-alt" id="como-pedir">
          <div className="lp-inner">
            <h2 className="lp-h2">Peça em três passos</h2>
            <ol className="lp-steps">
              {STEPS.map((s) => (
                <li className="lp-step" key={s.title}>
                  <span className="lp-bobber" aria-hidden="true" />
                  <h3 className="lp-step-title">{s.title}</h3>
                  <p className="lp-step-text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lp-section" id="cardapio">
          <div className="lp-inner">
            <h2 className="lp-h2">Cardápio</h2>
            <p className="lp-intro lp-intro-wide">
              O que tem para comer, beber e pescar. Os mesmos itens estão na página de pedido.
            </p>
            <div className="lp-menu">
              {CATEGORIES.map((cat) => (
                <div className="lp-menu-group" key={cat}>
                  <h3 className="lp-menu-title">{cat}</h3>
                  <ul className="lp-menu-list">
                    {MENU.filter((p) => p.category === cat).map((p) => (
                      <li key={p.id}>
                        <div className="lp-menu-row">
                          <span>{p.name}</span>
                          <span className="lp-leader" aria-hidden="true" />
                          <span className="lp-price">{brl(p.price)}</span>
                        </div>
                        {p.description && <p className="lp-desc">{p.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="lp-menu-cta">
              <Link className="lp-btn lp-btn-dark" href="/pedido">
                Fazer pedido
              </Link>
            </p>
          </div>
        </section>

        {photos.length > 0 && (
          <section className="lp-section lp-alt" id="fotos">
            <div className="lp-inner">
              <h2 className="lp-h2">Fotos do lugar</h2>
              <div className="lp-photos">
                {photos.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt={`Foto ${i + 1} do pesqueiro`} loading="lazy" />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="lp-section lp-alt" id="visita">
          <div className="lp-inner lp-split">
            <div>
              <h2 className="lp-h2">Venha passar o dia</h2>
              <p className="lp-intro">Abra a rota no Google Maps e chegue direto ao lago.</p>
              <p>
                <a className="lp-btn lp-btn-dark" href={SITE.mapsUrl} target="_blank" rel="noreferrer">
                  Abrir no Google Maps
                </a>
              </p>
            </div>
            {(SITE.address || SITE.hours) && (
              <dl className="lp-facts">
                {SITE.address && (
                  <div className="lp-fact">
                    <dt className="lp-fact-title">Endereço</dt>
                    <dd className="lp-fact-text">{SITE.address}</dd>
                  </div>
                )}
                {SITE.hours && (
                  <div className="lp-fact">
                    <dt className="lp-fact-title">Horário</dt>
                    <dd className="lp-fact-text">{SITE.hours}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </section>

        <section className="lp-final">
          <div className="lp-inner">
            <h2 className="lp-h2 lp-h2-light">Faça seu pedido pelo site</h2>
            <p className="lp-final-text">
              Escolha os itens, informe como quer receber e envie para o WhatsApp do pesqueiro.
            </p>
            <Link className="lp-btn lp-btn-primary" href="/pedido">
              Fazer pedido
            </Link>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-inner">
          <p>{SITE.name}. Pedidos pelo site e pelo WhatsApp.</p>
        </div>
      </footer>
    </div>
  );
}
