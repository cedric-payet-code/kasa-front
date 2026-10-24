import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import Carousel from "./Carousel";

// next/image a besoin du serveur Next : on le remplace par une simple <img> pour les tests.
vi.mock("next/image", () => ({
  default: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt} />
  ),
}));

const images = ["/photo-1.jpg", "/photo-2.jpg", "/photo-3.jpg"];

/** Renvoie le numéro (1, 2, 3…) de la photo actuellement affichée. */
function currentSlide() {
  const slides = screen.getAllByRole("group", { hidden: true });
  const index = slides.findIndex((slide) => slide.getAttribute("aria-hidden") === "false");
  return index + 1;
}

describe("Carousel", () => {
  it("affiche la première photo au départ", () => {
    render(<Carousel images={images} title="Appartement cosy" />);
    expect(currentSlide()).toBe(1);
  });

  it("affiche les flèches quand il y a plusieurs photos", () => {
    render(<Carousel images={images} title="Appartement cosy" />);
    expect(screen.getByRole("button", { name: "Photo précédente" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Photo suivante" })).toBeInTheDocument();
  });

  it("n'affiche pas les flèches quand il n'y a qu'une photo", () => {
    render(<Carousel images={["/seule.jpg"]} title="Studio" />);
    expect(screen.queryByRole("button", { name: "Photo précédente" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Photo suivante" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Studio – photo 1" })).toBeInTheDocument();
  });

  it("passe à la photo suivante avec la flèche droite", async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} title="Appartement cosy" />);
    await user.click(screen.getByRole("button", { name: "Photo suivante" }));
    expect(currentSlide()).toBe(2);
  });

  it("revient à la photo précédente avec la flèche gauche", async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} title="Appartement cosy" />);
    await user.click(screen.getByRole("button", { name: "Photo suivante" }));
    await user.click(screen.getByRole("button", { name: "Photo précédente" }));
    expect(currentSlide()).toBe(1);
  });

  it("boucle de la dernière photo à la première", async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} title="Appartement cosy" />);
    const next = screen.getByRole("button", { name: "Photo suivante" });
    await user.click(next);
    await user.click(next);
    expect(currentSlide()).toBe(3);
    await user.click(next);
    expect(currentSlide()).toBe(1);
  });

  it("boucle de la première photo à la dernière", async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} title="Appartement cosy" />);
    await user.click(screen.getByRole("button", { name: "Photo précédente" }));
    expect(currentSlide()).toBe(3);
  });

  it("se pilote au clavier avec les flèches gauche et droite", async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} title="Appartement cosy" />);
    screen.getByRole("region", { name: "Photos du logement Appartement cosy" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(currentSlide()).toBe(2);
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(currentSlide()).toBe(3);
  });

  it("n'affiche rien de cassé quand il n'y a aucune photo", () => {
    render(<Carousel images={[]} title="Vide" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
