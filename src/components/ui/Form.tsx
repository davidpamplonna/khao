"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent, ReactNode } from "react";
import { Check, X } from "lucide-react";
import { createPortal } from "react-dom";

import { setScrollLocked } from "@/src/motion/scroll-lock";
import { Button } from "./button";

type ReservationFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ReservationFormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
};

type ReservationButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const INITIAL_FORM: ReservationFormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  occasion: "",
  notes: "",
};

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function ReservationButton({
  children,
  variant = "secondary",
  className,
}: ReservationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </Button>
      <ReservationForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export function ReservationForm({ isOpen, onClose }: ReservationFormProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousBodyOverflowRef = useRef("");
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!isOpen || !isMounted) return;

    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflowRef.current;
      setScrollLocked(false);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isMounted, onClose]);

  if (!isOpen || !isMounted) return null;

  const updateField = (field: keyof ReservationFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setIsSent(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain touch-pan-y bg-khao-black/80 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-10"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        className="relative mx-auto max-h-[calc(100dvh-3rem)] w-full max-w-3xl overflow-y-auto overscroll-contain touch-pan-y border border-khao-white/15 bg-khao-bg shadow-[0_25px_100px_rgba(0,0,0,0.55)] sm:max-h-[calc(100dvh-5rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
      >
        <div className="flex items-start justify-between gap-6 border-b border-khao-white/10 px-5 py-5 sm:px-8 sm:py-7">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-khao-gold">
              Reservas / KHAO
            </p>
            <h2
              id="reservation-title"
              className="font-khao-title text-4xl leading-none text-khao-white sm:text-5xl"
            >
              Reserve sua mesa.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-khao-description/75">
              Conte-nos quando você quer viver essa experiência. Retornaremos
              por e-mail com a confirmação da disponibilidade.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Fechar formulário de reserva"
            className="flex size-10 shrink-0 items-center justify-center border border-khao-white/20 text-khao-white transition-colors hover:border-khao-gold hover:text-khao-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-khao-gold"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {isSent ? (
          <div
            className="px-5 py-16 text-center sm:px-8 sm:py-24"
            aria-live="polite"
          >
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-khao-gold text-khao-gold">
              <Check size={24} aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-khao-title text-4xl text-khao-white">
              Solicitação recebida.
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-khao-description/75">
              A mensagem de confirmação foi enviada para {form.email}. Nossa
              equipe retornará com a disponibilidade da mesa.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-8 border-b border-khao-gold pb-1 text-[10px] font-medium uppercase tracking-[0.28em] text-khao-gold transition-colors hover:text-khao-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-khao-gold"
            >
              Fechar confirmação
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Nome completo"
                name="name"
                value={form.name}
                onChange={(value) => updateField("name", value)}
                placeholder="Como podemos chamar você?"
                required
              />
              <Field
                label="E-mail"
                name="email"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                placeholder="voce@email.com"
                required
              />
              <Field
                label="Telefone / WhatsApp"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(value) => updateField("phone", value)}
                placeholder="(00) 00000-0000"
                required
              />
              <Field
                label="Número de pessoas"
                name="guests"
                type="number"
                min="1"
                max="20"
                value={form.guests}
                onChange={(value) => updateField("guests", value)}
                required
              />
              <Field
                label="Data preferida"
                name="date"
                type="date"
                min={getToday()}
                value={form.date}
                onChange={(value) => updateField("date", value)}
                required
              />
              <Field
                label="Horário preferido"
                name="time"
                type="time"
                value={form.time}
                onChange={(value) => updateField("time", value)}
                required
              />
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-khao-gold">
                  Motivo da visita
                </span>
                <select
                  name="occasion"
                  value={form.occasion}
                  onChange={(event) =>
                    updateField("occasion", event.target.value)
                  }
                  className="min-h-12 border border-khao-white/20 bg-khao-black px-4 text-sm text-khao-white outline-none transition-colors focus:border-khao-gold"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="encontro">Encontro</option>
                  <option value="aniversario">Aniversário</option>
                  <option value="negocios">Jantar de negócios</option>
                  <option value="celebracao">Outra celebração</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-khao-gold">
                  Observações
                </span>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Alergias, preferências ou algum detalhe importante..."
                  rows={3}
                  className="resize-y border border-khao-white/20 bg-khao-black px-4 py-3 text-sm text-khao-white outline-none transition-colors placeholder:text-khao-white/35 focus:border-khao-gold"
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t border-khao-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-relaxed text-khao-white/50">
                O envio é uma solicitação de reserva. A confirmação final
                depende da disponibilidade da casa.
              </p>
              <Button type="submit" variant="primary" className="shrink-0">
                Enviar solicitação
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  max?: string;
  required?: boolean;
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  required = false,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-khao-gold">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className="min-h-12 border border-khao-white/20 bg-khao-black px-4 text-sm text-khao-white outline-none transition-colors placeholder:text-khao-white/35 focus:border-khao-gold"
      />
    </label>
  );
}
