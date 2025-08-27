import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ResultsDisplay } from "@/components/results-display"

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <ResultsDisplay />
      <Footer />
    </main>
  )
}
