"use client";
import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React from "react";
import ApiDemonstration from "@/app/(client)/components/ApiDemonstration";
import { useSession } from "next-auth/react";

const RefDetails = () => {
  const { data: session } = useSession();
  const [movieId, setMovieId] = React.useState('');

  return (
    <RootLayout>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Movie Details
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            This section provides detailed information about movies from our
            database. You can view extensive details such as title, URL stream,
            synopsis, and rating. This feature is designed to offer in-depth
            insights into each movie, enhancing the user's experience by
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
                {`{baseUrl}/movie/:id`}
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
            To fetch the details of a specific movie, the <strong>id</strong>{" "}
            parameter is required. This ID should be passed in the URL as shown
            in the endpoint information above.
          </p>
          <div className="bg-secondary p-4 rounded-md border border-border">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Example URL with ID
            </h3>
            <code className="text-base break-all text-foreground">
              {`{baseUrl}/movie/123`} {/* Example ID */}
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
              movie details were retrieved.
            </p>
            <pre className="p-2 rounded-md bg-secondary overflow-x-auto">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 200,
                    status: "success",
                    message: "Movie fetched successfully",
                    results: {
                      id: "123",
                      title: "Inception",
                      genre: "Action",
                      year: 2010,
                      rating: "PG-13",
                      synopsis:
                        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
                      urlStream: "https://example.com/stream/inception",
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
              400 Bad Request - Invalid Movie ID Format
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when the movie ID provided does not meet
              the expected format.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 400,
                    status: "error",
                    message: "Invalid movie ID format",
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
              404 Not Found - Movie Not Found
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when no movie matches the ID provided in
              the database.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 404,
                    status: "error",
                    message: "Movie not found",
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
            Try out the Movie Details API with this interactive demonstration.
            Enter a movie ID below and click the button to make an API call.
          </p>
          <div className="mb-4">
            <label
              htmlFor="movieId"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Movie ID
            </label>
            <input
              onChange={(e) => setMovieId(e.target.value)}
              type="text"
              id="movieId"
              name="movieId"
              placeholder="Enter movie ID"
              className="w-full p-2 rounded-md border border-input bg-background text-foreground"
            />
          </div>
          <ApiDemonstration
            token={(session?.user as any)?.tokenApi}
            endpoint={`/api/v1/movie/${movieId}`}
            queryParams={{}}
          />
        </section>
      </main>
    </RootLayout>
  );
};

export default RefDetails;
