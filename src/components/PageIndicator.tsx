interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
            index + 1 === currentPage
              ? 'w-8 sm:w-10 bg-blue-500'
              : 'w-1.5 sm:w-2 bg-slate-300'
          }`}
        />
      ))}
    </div>
  );
}
