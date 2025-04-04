import { Metadata } from "next"
import { SpaceListingForm } from "@/components/spaces/space-listing-form"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "List Your Space - WorkSpace Share",
  description: "List your workspace for others to book",
}

export default function ListSpacePage() {
  return (
    <ProtectedRoute>
      <div className="container max-w-4xl py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">List Your Space</h1>
          <p className="text-gray-500">
            Fill out the form below to list your workspace. Be sure to include all relevant details
            to help potential bookers make their decision.
          </p>
          <SpaceListingForm />
        </div>
      </div>
    </ProtectedRoute>
  )
}
