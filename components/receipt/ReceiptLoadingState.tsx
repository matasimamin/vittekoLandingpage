export default function ReceiptLoadingState() {
  return (
    <div className="mx-auto flex max-w-[560px] flex-col gap-7 lg:max-w-[640px] lg:gap-9">
      {/* Hero skeleton */}
      <section className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-gray-200 p-7 text-center shadow-sm sm:p-9 lg:rounded-[28px] lg:p-11">
        <Skel className="mb-3.5 h-16 w-16 rounded-[18px]" />
        <Skel className="mt-3 h-7 w-[55%] rounded-md" />
        <Skel className="mt-2 h-3.5 w-[35%] rounded" />
        <div className="mt-5 flex w-full flex-col items-center border-y border-dashed border-gray-200 py-4">
          <Skel className="h-3 w-[70px] rounded" />
          <Skel className="mt-2 h-12 w-[220px] rounded-lg" />
        </div>
        <Skel className="mt-3 h-3.5 w-[180px] rounded" />
        <div className="mt-[18px] grid w-full grid-cols-3 gap-2">
          <Skel className="h-[52px] rounded-xl" />
          <Skel className="h-[52px] rounded-xl" />
          <Skel className="h-[52px] rounded-xl" />
        </div>
      </section>

      {/* Accordion skeletons */}
      <div className="flex flex-col">
        {[70, 55, 50, 45, 60].map((w, i) => (
          <div key={i} className="flex items-center border-b border-gray-200 px-1 py-[18px] first:border-t">
            <Skel className="rounded" style={{ width: `${w}%`, height: 15 }} />
            <Skel className="ml-auto h-5 w-5 shrink-0 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Skel({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`block animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] ${className}`}
      style={style}
    />
  );
}
