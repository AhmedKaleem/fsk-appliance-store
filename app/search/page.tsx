import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-600">
          Loading search...
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}

