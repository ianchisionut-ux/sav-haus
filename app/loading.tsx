export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-[64px] w-full animate-pulse bg-graybg" />
      <div className="h-[400px] w-full animate-pulse bg-gray-100" />
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-10">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-100" />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[220px] animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
