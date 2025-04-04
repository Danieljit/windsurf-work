"use client"

import * as React from "react"
import { format, startOfToday } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface BookingFormProps {
  price: number
}

export function BookingForm({ price }: BookingFormProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  // const [timeSlot, setTimeSlot] = React.useState("morning")

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Date</h3>
          {date && (
            <p className="text-sm text-muted-foreground mb-2">
              Selected: {format(date, "EEEE, MMMM do, yyyy")}
            </p>
          )}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(date) => date < startOfToday()}
            className="rounded-md border"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Select Time</h3>
          <RadioGroup
            defaultValue="morning"
            // onValueChange={setTimeSlot}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem
                value="morning"
                id="morning"
                className="peer sr-only"
              />
              <Label
                htmlFor="morning"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
              >
                <span className="material-symbols-outlined mb-2 text-2xl">
                  wb_sunny
                </span>
                <span className="text-sm font-medium">Morning</span>
                <span className="text-xs text-gray-500">09:00 - 13:00</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="afternoon"
                id="afternoon"
                className="peer sr-only"
              />
              <Label
                htmlFor="afternoon"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
              >
                <span className="material-symbols-outlined mb-2 text-2xl">
                  wb_twilight
                </span>
                <span className="text-sm font-medium">Afternoon</span>
                <span className="text-xs text-gray-500">13:00 - 17:00</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full" size="lg">
          Book for ${price}
        </Button>
      </div>
    </Card>
  )
}
