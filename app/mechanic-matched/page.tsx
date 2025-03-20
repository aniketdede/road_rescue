"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MessageCircle, Phone, Truck } from "lucide-react"

export default function MechanicMatchedPage() {
  const router = useRouter()
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "mechanic" }[]>([])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setMessages([...messages, { text: message, sender: "user" }])
    setMessage("")

    // Simulate mechanic response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm on my way! Should be there in about 15 minutes. Do you have any specific tools or parts I should bring?",
          sender: "mechanic",
        },
      ])
    }, 2000)
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
                <Badge className="bg-green-500 hover:bg-green-600">Mechanic Matched</Badge>
                <Button variant="outline" size="sm" onClick={() => router.push("/tracking")}>
                  Track
                </Button>
              </div>
              <CardTitle className="mt-4">Your mechanic is on the way!</CardTitle>
              <CardDescription>Estimated arrival time: 15 minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Mechanic" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>4.9 (120 reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Certified Mechanic • 5 years exp</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Issue Details</h4>
                <div className="bg-muted p-3 rounded-md text-sm">
                  <p className="font-medium">Flat Tire</p>
                  <p className="text-muted-foreground mt-1">
                    Front passenger side tire is flat. I don't have the tools to change it.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Location</h4>
                <div className="h-[150px] w-full bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Map View</span>
                </div>
                <p className="text-sm text-muted-foreground">123 Main St, Anytown, USA</p>
              </div>

              {showChat ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Chat with John</h4>
                    <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                      Close
                    </Button>
                  </div>
                  <div className="border rounded-md h-[200px] overflow-y-auto p-3 space-y-2">
                    {messages.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        No messages yet. Start the conversation!
                      </p>
                    ) : (
                      messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                              msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Type your message..."
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowChat(!showChat)}>
                <MessageCircle className="mr-2 h-4 w-4" />
                {showChat ? "Hide Chat" : "Chat"}
              </Button>
              <Button>
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

