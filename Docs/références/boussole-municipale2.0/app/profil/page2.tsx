import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProfileForm } from "@/components/profile-form"

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <ProfileForm />
      <Footer />
    </main>
  )
}
