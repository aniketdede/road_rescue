"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Truck, Navigation } from "lucide-react"

export default function TrackingPage() {
  const router = useRouter()
  const [eta, setEta] = useState(15)
  const [distance, setDistance] = useState(3.2)

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimeout(() => router.push("/service"), 2000)
          return 0
        }
        return prev - 1
      })

      setDistance((prev) => {
        if (prev <= 0.1) return 0
        return Number.parseFloat((prev - 0.2).toFixed(1))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

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

      <main className="flex-1">
        <div className="relative h-[60vh] bg-muted flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Your Location</span>
          </div>

          <div
            className="absolute"
            style={{
              bottom: `${Math.min(60, 10 + eta * 3)}%`,
              left: `${Math.min(70, 30 + eta * 2)}%`,
            }}
          >
            <div className="relative">
              <div className="animate-pulse">
                <Navigation className="h-8 w-8 text-primary rotate-45" />
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-background rounded-full px-2 py-1 text-xs font-medium shadow-sm">
                John's Vehicle
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 -mt-20">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/mechanic-matched">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <Badge className="bg-green-500 hover:bg-green-600">{eta === 0 ? "Arrived" : "On the way"}</Badge>
              </div>
              <CardTitle className="mt-4">Tracking your mechanic</CardTitle>
              <CardDescription>
                {eta === 0 ? "Your mechanic has arrived!" : `Estimated arrival in ${eta} minutes`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Mechanic" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Toyota Tacoma • White • ABC-1234</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{distance} miles away</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ETA</p>
                    <p className="font-medium">{eta === 0 ? "Arrived" : `${eta} min`}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push("/mechanic-matched")}>
                Back to Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

