export default function BorderLayout({ children }: {children: any}) {
  return (
    <div className="z-50 fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity overflow-hidden">
      <div
        tabIndex={-1}
        className="inline-block align-bottom h-5/6  rounded-lg w-full scrollbar-hide text-left outline-none overflow-auto transform max-w-sm mt-16 sm:max-w-md"
      >
        <div className="relative  h-full md:h-auto">
          {/* <!-- Modal content --> */}

          <div className="relative bg-slate-800 mx-3 rounded-lg shadow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
