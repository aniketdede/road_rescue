"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Truck, CheckCircle2 } from "lucide-react"

export default function ServicePage() {
  const router = useRouter()
  const [progress, setProgress] = useState(30)
  const [status, setStatus] = useState("in-progress")

  const handleCompleteService = () => {
    setProgress(100)
    setStatus("completed")
    setTimeout(() => router.push("/payment"), 2000)
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
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge
                  className={
                    status === "completed" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                  }
                >
                  {status === "completed" ? "Service Completed" : "Service In Progress"}
                </Badge>
              </div>
              <CardTitle className="mt-4">
                {status === "completed" ? "Your issue has been resolved!" : "Your mechanic is working on your issue"}
              </CardTitle>
              <CardDescription>
                {status === "completed"
                  ? "The flat tire has been replaced successfully"
                  : "John is currently replacing your flat tire"}
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
                  <p className="text-sm text-muted-foreground">Certified Mechanic • 5 years exp</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Service Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Service Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Arrived at location</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>Assessed the issue</span>
                  </div>
                  <div className="flex items-center">
                    {progress >= 50 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted mr-2" />
                    )}
                    <span className={progress >= 50 ? "" : "text-muted-foreground"}>Removed flat tire</span>
                  </div>
                  <div className="flex items-center">
                    {progress >= 80 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted mr-2" />
                    )}
                    <span className={progress >= 80 ? "" : "text-muted-foreground"}>Installed spare tire</span>
                  </div>
                  <div className="flex items-center">
                    {progress === 100 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted mr-2" />
                    )}
                    <span className={progress === 100 ? "" : "text-muted-foreground"}>Completed final checks</span>
                  </div>
                </div>
              </div>

              {status === "completed" && (
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Service Notes</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Replaced the flat tire with your spare. The damaged tire has a nail in it and will need to be
                    repaired or replaced. I've placed it in your trunk.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {status === "in-progress" ? (
                <Button className="w-full" onClick={handleCompleteService}>
                  Simulate Service Completion
                </Button>
              ) : (
                <Button className="w-full" onClick={() => router.push("/payment")}>
                  Proceed to Payment
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

