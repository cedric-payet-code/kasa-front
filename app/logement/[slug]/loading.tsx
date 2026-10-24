/** Squelette affiché pendant le chargement d'un logement. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Chargement du logement"
      className="mx-auto flex max-w-[1003px] animate-pulse flex-col gap-6 px-4 pt-2.5 pb-10 lg:pt-10"
    >
      <div className="h-9 w-[189px] rounded-[10px] bg-blanc lg:my-4" />
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[616px_345px] lg:gap-y-6">
        <div className="h-[422px] rounded-[10px] bg-blanc md:h-[357px]" />
        <div className="h-[400px] rounded-[10px] bg-blanc" />
        <div className="h-[281px] rounded-[10px] bg-blanc lg:col-start-2 lg:row-start-1" />
      </div>
    </div>
  );
}
