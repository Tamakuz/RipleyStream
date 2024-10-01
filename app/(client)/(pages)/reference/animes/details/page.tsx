"use client";
import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React from "react";
import ApiDemonstration from "@/app/(client)/components/ApiDemonstration";
import { useSession } from "next-auth/react";

const RefDetails = () => {
  const { data: session } = useSession();
  const [queryParams, setQueryParams] = React.useState({
    id: ''
  });

  return (
    <RootLayout>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Anime Details
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            This section provides detailed information about animes from our
            database. You can view extensive details such as title, URL stream,
            synopsis, and rating. This feature is designed to offer in-depth
            insights into each anime, enhancing the user's experience by
            providing all necessary information in one place.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Endpoint Information
          </h2>
          <div className="bg-secondary p-4 rounded-md border border-border">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Endpoint URL
            </h3>
            <div className="flex items-center space-x-2 bg-card p-2 rounded-md">
              <code className="text-base break-all text-foreground">
                {`{baseUrl}/anime/:id`}
              </code>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 border-green-300"
              >
                GET
              </Badge>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Required Parameter
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            To fetch the details of a specific anime, the <strong>id</strong>{" "}
            parameter is required. This ID should be passed in the URL as shown
            in the endpoint information above.
          </p>
          <div className="bg-secondary p-4 rounded-md border border-border">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Example URL with ID
            </h3>
            <code className="text-base break-all text-foreground">
              {`{baseUrl}/animes/123`} {/* Example ID */}
            </code>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Example Response
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              200 OK - Successful Response
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response indicates that the request was successful and the
              anime details were retrieved.
            </p>
            <pre className="p-2 rounded-md bg-secondary overflow-x-auto">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 200,
                    status: "success",
                    message: "Anime fetched successfully",
                    results: {
                      id: "123",
                      title: "Attack on Titan",
                      genre: "Action, Dark Fantasy",
                      year: 2013,
                      rating: "R - 17+",
                      synopsis:
                        "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager joins the military with his childhood friends to fight the Titans.",
                      urlStream: "https://example.com/stream/attack-on-titan",
                    },
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              400 Bad Request - Invalid Anime ID Format
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when the anime ID provided does not meet
              the expected format.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 400,
                    status: "error",
                    message: "Invalid anime ID format",
                    results: null,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              404 Not Found - Anime Not Found
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when no anime matches the ID provided in
              the database.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 404,
                    status: "error",
                    message: "Anime not found",
                    results: null,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            API Demonstration
          </h2>
          <p className="mb-4 text-muted-foreground">
            Try out the Anime Details API with this interactive demonstration.
            Enter an anime ID below and click the button to make an API call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="animeId"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Anime ID
              </label>
              <input
                onChange={(e) => setQueryParams({ ...queryParams, id: e.target.value })}
                type="text"
                id="animeId"
                name="animeId"
                value={queryParams.id}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              />
            </div>
          </div>
          <ApiDemonstration
            token={(session?.user as any)?.tokenApi}
            endpoint={`/api/v1/anime/${queryParams.id}`}
            queryParams={queryParams}
          />
        </section>
      </main>
    </RootLayout>
  );
};

export default RefDetails;
