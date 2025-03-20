"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Loader2 } from "lucide-react"

export default function FindingMechanicPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          router.push("/mechanic-matched")
          return 100
        }
        return prev + 10
      })
    }, 500)

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

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Finding Nearby Mechanics</CardTitle>
              <CardDescription>We're matching you with available mechanics in your area</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
              <div className="relative flex items-center justify-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <div className="absolute">
                  <Truck className="h-8 w-8" />
                </div>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {progress < 100 ? "Searching for mechanics..." : "Match found!"}
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/report-issue">Cancel</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

