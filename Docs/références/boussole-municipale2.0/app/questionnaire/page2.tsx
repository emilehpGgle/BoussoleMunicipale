import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { QuestionnaireForm } from "@/components/questionnaire-form"

export default function QuestionnairePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <QuestionnaireForm />
      <Footer />
    </main>
  )
}
