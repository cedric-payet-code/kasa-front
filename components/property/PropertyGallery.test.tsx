import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ImgHTMLAttributes } from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import PropertyGallery from "./PropertyGallery";

// next/image a besoin du serveur Next : on le remplace par une simple <img>.
vi.mock("next/image", () => ({
  default: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt} />
  ),
}));

// jsdom ne gère pas showModal() / close() de <dialog> : on les simule.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

const pictures = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];

/** Renvoie le numéro de la photo affichée dans le carrousel de la modale. */
function currentSlide() {
  const slides = screen.getAllByRole("group", { hidden: true });
  return slides.findIndex((slide) => slide.getAttribute("aria-hidden") === "false") + 1;
}

describe("PropertyGallery et modale carrousel", () => {
  it("n'affiche pas la modale au départ", () => {
    render(<PropertyGallery pictures={pictures} title="Appartement cosy" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ouvre la modale sur la photo cliquée", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery pictures={pictures} title="Appartement cosy" />);
    await user.click(screen.getByRole("button", { name: /Agrandir la photo 3 sur 5/ }));

    expect(screen.getByRole("dialog", { name: "Photos du logement Appartement cosy" })).toBeInTheDocument();
    expect(currentSlide()).toBe(3);
  });

  it("ouvre la modale sur la première photo avec la grande photo", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery pictures={pictures} title="Appartement cosy" />);
    await user.click(screen.getByRole("button", { name: /Agrandir la photo 1 sur 5/ }));
    expect(currentSlide()).toBe(1);
  });

  it("ferme la modale avec le bouton Fermer", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery pictures={pictures} title="Appartement cosy" />);
    await user.click(screen.getByRole("button", { name: /Agrandir la photo 2/ }));
    await user.click(screen.getByRole("button", { name: "Fermer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("avec une seule photo : pas de miniatures, et pas de flèches dans la modale", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery pictures={["/seule.jpg"]} title="Studio" />);
    expect(screen.getAllByRole("button")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: /Agrandir la photo 1 sur 1/ }));
    expect(screen.queryByRole("button", { name: "Photo suivante" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Photo précédente" })).not.toBeInTheDocument();
  });
});
