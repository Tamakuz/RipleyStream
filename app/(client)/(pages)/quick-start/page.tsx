"use client"
import React from 'react'
import { RootLayout } from '../../layout/RootLayout'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ApiDemonstration from '../../components/ApiDemonstration'

const QuickStart = () => {
  const { data: session } = useSession()

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Quick Start Guide</h1>

        {(session?.user as any)?.tokenApi ? (
          <Card className="mb-8 bg-secondary shadow-none border border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Your API Token</CardTitle>
              <CardDescription className="text-muted-foreground">
                Use this token to authenticate your API requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-background p-4 rounded-md border border-border">
                <code className="text-sm break-all text-foreground">
                  {(session?.user as any)?.tokenApi || "No token found"}
                </code>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Keep this token secret and secure!
              </p>
            </CardContent>
          </Card>
        ) : (
          <Alert className="mb-8 border border-border">
            <AlertTitle className="text-lg font-semibold text-foreground">
              No API Token Found
            </AlertTitle>
            <AlertDescription className="text-muted-foreground">
              {session?.user
                ? "You don't have an API token yet. Please contact support to get one."
                : "Please sign in to view your API token or request one."}
            </AlertDescription>
          </Alert>
        )}

        <Alert className="mb-6 border border-border">
          <AlertTitle className="text-lg font-semibold text-foreground">
            Important Notice
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Before making any API requests, ensure you have obtained your API
            token. This is crucial for accessing our movie database.
          </AlertDescription>
        </Alert>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Welcome to Our Movie Database API
          </h2>
          <p className="mb-4 text-muted-foreground">
            We're thrilled to have you on board! Before you dive into the vast
            world of cinematic data, there's an essential step you need to take:
            securing your API token. This token is your key to unlocking the
            full potential of our movie database.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Why You Need an API Token
          </h2>
          <p className="mb-4 text-muted-foreground">
            An API token serves as your unique identifier and authentication
            key. It's crucial for several reasons:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4 text-muted-foreground">
            <li>Ensures the security and integrity of our database</li>
            <li>Allows us to track and manage your API usage effectively</li>
            <li>
              Enables us to provide you with personalized support when needed
            </li>
            <li>
              Helps prevent unauthorized access and protects our resources
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Best Practices for Token Usage
          </h2>
          <p className="mb-4 text-muted-foreground">
            Now that you have your token, keep these best practices in mind:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4 text-muted-foreground">
            <li>
              Never share your token publicly or commit it to version control
            </li>
            <li>
              Use environment variables to store your token in your applications
            </li>
            <li>Rotate your token periodically for enhanced security</li>
            <li>
              If you suspect your token has been compromised, regenerate it
              immediately (Coming soon feature)
            </li>
          </ul>
        </section>

        <Badge variant="outline" className="mb-6 border-border text-muted-foreground">
          Pro Tip: Always include your API token in the headers of your requests
          for seamless authentication!
        </Badge>

        <p className="text-lg text-muted-foreground mb-8">
          With your API token secured, you're now ready to explore the vast
          world of movies through our API. Happy coding, and may your
          applications be filled with cinematic wonders!
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            API Demonstration
          </h2>
          <p className="mb-4 text-muted-foreground">
            Try out our API with this simple demonstration. Click the button below to fetch some movie data.
          </p>
          <ApiDemonstration token={(session?.user as any)?.tokenApi} endpoint="/api/v1/movies/discover" queryParams={{ limit: '3' }} />
        </section>
        <section className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Level Up Your API Game <span className="inline-block animate-bounce">🚀</span>
          </h2>
          <p className="mb-6 text-lg text-white opacity-90">
            You've just scratched the surface! Here's how to take your API skills from zero to hero:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 p-5 rounded-lg backdrop-filter backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
                <span className="mr-2">📚</span> Dive into Docs
              </h3>
              <p className="text-sm text-white opacity-80">Explore our comprehensive API documentation - it's like cheat codes for developers!</p>
            </div>
            <div className="bg-white bg-opacity-10 p-5 rounded-lg backdrop-filter backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
                <span className="mr-2">💪</span> Build Something Epic
              </h3>
              <p className="text-sm text-white opacity-80">Flex your coding muscles and create amazing projects with our API.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-5 rounded-lg backdrop-filter backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
                <span className="mr-2">🤝</span> Join Healthy Communities
              </h3>
              <p className="text-sm text-white opacity-80">Connect with positive and supportive developer communities. Find like-minded peers who can help you grow and share knowledge about APIs!</p>
            </div>
            <div className="bg-white bg-opacity-10 p-5 rounded-lg backdrop-filter backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
                <span className="mr-2">🔥</span> Get Inspired
              </h3>
              <p className="text-sm text-white opacity-80">Check out our sample projects for inspiration - they're seriously impressive!</p>
            </div>
          </div>
          <p className="mt-6 text-lg text-white font-semibold">
            Remember, while there's no dedicated support team, the developer community can be a great resource if you hit a snag. Now go conquer that code on your own! <span className="inline-block animate-pulse">💻✨</span>
          </p>
        </section>
      </div>
    </RootLayout>
  );
}

export default QuickStart