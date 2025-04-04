import { db } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NewsletterCTA, Footer } from "@/components/layout/footer"

export default async function SpacesPage() {
  const spaces = await db.space.findMany({
    include: {
      owner: true,
    },
  })

  return (
    <main className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Spaces</h1>
        <div className="space-x-4">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => {
          const amenities = JSON.parse(space.amenities || "{}")
          const images = JSON.parse(space.images || "[]")
          const firstImage = images[0] || "/placeholder.jpg"

          return (
            <div key={space.id} className="border rounded-lg p-4 space-y-4">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src={firstImage}
                  alt={space.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{space.name}</h3>
                <p className="text-sm text-gray-500">
                  {space.location} • {space.type}
                </p>
                <p className="text-sm">
                  {Object.keys(amenities).length} amenities available
                </p>
                <p className="font-medium">${space.price} per day</p>
              </div>
              <Link href={`/spaces/${space.id}`} className="block">
                <Button className="w-full">View Details</Button>
              </Link>
            </div>
          )
        })}
      </div>
      <NewsletterCTA />
      <Footer />
    </main>
  )
}
