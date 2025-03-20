"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Truck } from "lucide-react"

export default function ReportIssuePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState("")
  const [isLocating, setIsLocating] = useState(false)

  const handleGetLocation = () => {
    setIsLocating(true)
    // Simulate geolocation
    setTimeout(() => {
      setLocation("123 Main St, Anytown, USA")
      setIsLocating(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/finding-mechanic")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Truck className="h-6 w-6" />
            <span>RoadRescue</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Report an Issue</h1>
          </div>

          <Card className="max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <CardHeader>
                    <CardTitle>What's the problem?</CardTitle>
                    <CardDescription>Select the issue you're experiencing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="flat-tire" className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flat-tire" id="flat-tire" />
                        <Label htmlFor="flat-tire">Flat Tire</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="battery" id="battery" />
                        <Label htmlFor="battery">Dead Battery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="locked-out" id="locked-out" />
                        <Label htmlFor="locked-out">Locked Out</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="engine" id="engine" />
                        <Label htmlFor="engine">Engine Problem</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-4">
                      <Label htmlFor="details">Additional Details</Label>
                      <Textarea id="details" placeholder="Please describe your issue in detail..." className="mt-1" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => setStep(2)}>
                      Next
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle>Share your location</CardTitle>
                    <CardDescription>We need your location to find nearby mechanics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLocating}>
                        {isLocating ? "Locating..." : "Use Current Location"}
                        <MapPin className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your address manually"
                      />
                    </div>
                    <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Map Preview</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full" type="submit">
                      Find Mechanics
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>
                      Back
                    </Button>
                  </CardFooter>
                </>
              )}
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

