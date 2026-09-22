import Link from "next/link";
import Image from "next/image";

import { Logo } from "../ui/logo";

import { KHAO_SOCIAL } from "@/src/data/assets/image";

const FOOTER_LINKS = {
  navigation: [
    { label: "Experiência", href: "#experiencia" },
    { label: "Reservas", href: "#reservas" },
    { label: "Contato", href: "#contato" },
  ],
  about: [
    { label: "Localização", href: "#localizacao" },
    { label: "Eventos", href: "#eventos" },
  ],
} as const;

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/restobarkhao",
    icon: KHAO_SOCIAL.facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/restobarkhao/",
    icon: KHAO_SOCIAL.instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/pt-BR/",
    icon: KHAO_SOCIAL.tiktok,
  },
] as const;

const OPENING_HOURS = [
  "Ter — Qui",
  "12:00 — 23:00",
  "Sex — Sáb",
  "12:00 — 00:00",
];

const ADDRESS = ["Av. Exemplo, 123", "São Paulo — SP"];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative bg-khao-bg px-9 pb-8 pt-[8.1rem] max-md:px-6 max-md:pt-20">
      <div className="mx-auto flex w-full max-w-342 flex-col items-center">
        <FooterBrand />

        <div className="mt-[6.7rem] grid w-full grid-cols-4 gap-10 max-md:mt-16 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-12">
          <FooterColumn title="Navegação" links={FOOTER_LINKS.navigation} />

          <FooterColumn title="Sobre a Khao" links={FOOTER_LINKS.about} />

          <OpeningHours />

          <SocialLinks />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
}

function FooterBrand() {
  return (
    <div className="flex flex-col items-center">
      <Logo
        className="
       h-auto
          w-60
          max-md:w-65
          max-sm:w-50"
      />

      <p
        className="
          mt-8
          text-center
          font-khao-description
          text-[13px]
          md:text-md
          tracking-[0.3em]
          text-white/65
          
          max-md:tracking-[0.2em]
        "
      >
        A Tailândia não se explica. Se sente.
      </p>
    </div>
  );
}

type FooterColumnProps = {
  title: string;
  links: readonly {
    label: string;
    href: string;
  }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3
        className="
          font-khao-description
          text-[1.10rem]
          tracking-[0.25em]
          text-khao-gold
          max-md:text-base
        "
      >
        {title}
      </h3>

      <nav aria-label={title} className="mt-3 flex flex-col items-start gap-5">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="
              text-[14px] 
              tracking-[0.25em]
              text-khao-description
              transition-all
              duration-500
              hover:text-khao-gold
              hover:translate-x-3
            "
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function OpeningHours() {
  return (
    <div>
      <h3
        className="
          font-khao-description
         text-[1.10rem]
          tracking-[0.25em]
          text-khao-gold
          max-md:text-base
        "
      >
        Funcionamento
      </h3>

      <div className="mt-3 text-[14px] leading-[1.55] text-khao-description">
        <div className="space-y-1">
          {OPENING_HOURS.map((item, index) => (
            <p
              key={`${item}-${index}`}
              className={index === 2 ? "pt-3" : undefined}
            >
              {item}
            </p>
          ))}
        </div>

        <address className="mt-5 not-italic">
          {ADDRESS.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div>
      <h3
        className="
          font-khao-description
          text-[1.10rem]
          tracking-[0.25em]
          text-khao-gold
          max-md:text-base
        "
      >
        Siga o KHAO
      </h3>

      <nav aria-label="Redes sociais" className="mt-5 flex items-center gap-4">
        {SOCIAL_LINKS.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`KHAO no ${social.label}`}
            className="
              flex
              size-10
              items-center
              justify-center
              rounded-full
              bg-khao-black
              text-khao-black
              transition-transform
              duration-300
              hover:scale-105
              focus-visible:outline
              focus-visible:outline-offset-2
              focus-visible:outline-khao-gold
            "
          >
            <SocialIcon type={social.icon} />
          </Link>
        ))}
      </nav>
    </div>
  );
}

type SocialIconProps = {
  type: string;
};

function SocialIcon({ type }: SocialIconProps) {
  return <Image src={type} alt="" width={30} height={30} aria-hidden="true" />;
}

function FooterCopyright() {
  return (
    <div className="mt-[5.6rem] w-full border-t border-white/20 pt-8 text-center">
      <p className="text-[10px] tracking-[0.25em] text-khao-description/70">
        © {CURRENT_YEAR} KHAO — COZINHA TAILANDESA
      </p>
    </div>
  );
}
