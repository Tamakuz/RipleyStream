"use client";
import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React from "react";
import ApiDemonstration from "@/app/(client)/components/ApiDemonstration";
import { useSession } from "next-auth/react";

const MovieCastPage = () => {
  const { data: session } = useSession();
  const [queryParams, setQueryParams] = React.useState({
    movieId: ''
  });

  return (
    <RootLayout>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Movie Cast
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            The Movie Cast endpoint provides detailed information about the cast of a specific movie.
            This endpoint returns a collection of cast members for the requested movie, allowing you to
            display information about actors and their roles. It's a great feature for enhancing movie
            details pages or creating cast-focused sections in your application.
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
                {`{baseUrl}/movie/cast/:movieId`}
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
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">
            Path Parameters
          </h2>
          <p className="text-base text-muted-foreground mb-2">
            Use the following path parameter to specify the movie for which you want to retrieve the cast:
          </p>
          <ul className="list-disc list-inside text-base text-muted-foreground">
            <li>
              <strong>movieId</strong>: The unique identifier of the movie.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Example Responses
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              200 OK - Successful Response
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response indicates that the request was successful and the movie cast was retrieved.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 200,
                    status: "success",
                    message: "Movie cast fetched successfully",
                    results: [
                      {
                        originalName: "Actor Name",
                        characterName: "Character Name",
                        images: []
                      }
                    ],
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              404 Not Found - Cast Not Found
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when the specified movie is not found in the database.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 404,
                    status: "error",
                    message: "Cast not found",
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
              500 Internal Server Error - Server Failure
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response indicates that there was an internal server error
              that prevented the request from being fulfilled.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 500,
                    status: "error",
                    message: "Internal server error",
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
            Try out the Movie Cast API with this interactive demonstration.
            Enter a movie ID below and click the button to make an API call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="movieId"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Movie ID
              </label>
              <input
                onChange={(e) => setQueryParams({ ...queryParams, movieId: e.target.value })}
                type="text"
                id="movieId"
                name="movieId"
                value={queryParams.movieId}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              />
            </div>
          </div>
          <ApiDemonstration
            token={(session?.user as any)?.tokenApi}
            endpoint={`/api/v1/movie/cast/${queryParams.movieId}`}
            queryParams={queryParams}
          />
        </section>
      </main>
    </RootLayout>
  );
};

export default MovieCastPage;
