'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 text-center">
      <h2 className="text-4xl font-bold mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
        Something went wrong!
      </h2>
      <p className="text-neutral-400 mb-8 max-w-md">
        We encountered an error while loading the page. This might be due to a hydration mismatch or a temporary issue.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-[#FF4D00] text-white rounded-full font-medium hover:bg-[#FF4D00]/90 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
