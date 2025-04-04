"use client"

import { useState } from "react"
import { Space, User } from "@prisma/client"
import { SearchBar } from "@/components/search-bar"
import { QuickFilters } from "@/components/spaces/quick-filters"
import { FeaturedSpaces } from "@/components/spaces/featured-spaces"
import { Footer } from "@/components/layout/footer"
import { HomeTestimonials } from "@/components/sections/home-testimonials"
import { testimonials } from "@/data/testimonials"

interface HomePageProps {
  spaces: (Space & { owner: User })[]
}

export function HomePage({ spaces }: HomePageProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterClick = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 opacity-90" />
          <img
            src="https://images.pexels.com/photos/7070/space-desk-workspace-coworking.jpg"
            alt="Workspace"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Find Your Perfect Workspace
            </h1>
            <p className="text-xl text-white/90">
              Book professional workspaces for a day, week, or month.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={() => {}}
                placeholder="Search by location, amenities, or workspace type..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Filters</h2>
        <QuickFilters onFilterClick={handleFilterClick} activeFilters={activeFilters} />
      </section>

      {/* Featured Spaces */}
      <section className="container mx-auto px-4">
        <FeaturedSpaces spaces={spaces} />
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">What People Say</h2>
          <p className="text-muted-foreground mb-8">
            Hear from our satisfied workspace users
          </p>
          <HomeTestimonials testimonials={testimonials} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-5xl">search</span>
            <h3 className="text-xl font-semibold">Easy Booking</h3>
            <p className="text-gray-600">
              Find and book your workspace in minutes, not hours.
            </p>
          </div>
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-5xl">verified</span>
            <h3 className="text-xl font-semibold">Verified Spaces</h3>
            <p className="text-gray-600">
              Every workspace is verified for quality and comfort.
            </p>
          </div>
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-5xl">schedule</span>
            <h3 className="text-xl font-semibold">Flexible Terms</h3>
            <p className="text-gray-600">
              Book for a day or longer, no long-term commitments.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
