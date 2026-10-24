const steps = [
  {
    title: "Recherchez",
    text: "Entrez votre destination, vos dates et laissez Kasa faire le reste",
  },
  {
    title: "Réservez",
    text: "Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.",
  },
  {
    title: "Vivez l’expérience",
    text: "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.",
  },
];

/** Section « Comment ça marche ? » de la page d'accueil. */
export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="flex flex-col items-center gap-10 rounded-[10px] bg-blanc px-2 py-10 lg:p-10"
    >
      <div className="flex max-w-[640px] flex-col gap-4 text-center">
        <h2 id="how-it-works-title" className="text-2xl font-semibold text-noir">
          Comment ça marche ?
        </h2>
        <p className="text-sm text-black">
          Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage
          professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.
        </p>
      </div>

      <ol className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row lg:gap-4">
        {steps.map((step) => (
          <li
            key={step.title}
            className="flex h-[199px] flex-col gap-[17px] rounded-[10px] border border-gris-light bg-dark-orange px-[22px] py-11 text-blanc lg:w-[270px]"
          >
            <h3 className="text-lg font-medium">{step.title}</h3>
            <p className="text-xs">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
