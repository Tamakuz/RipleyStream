import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React from "react";

const RefMovies = () => {
  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Discover Movies
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            The Discover Movies endpoint provides a powerful way to find movies
            stored in our database. You can search through a wide array of
            movies using specific criteria such as genre, release year, and user
            ratings. This endpoint is perfect for creating dynamic movie
            discovery features in your applications.
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
                {`{baseUrl}/movies/discover`}
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
            Query Parameters
          </h2>
          <p className="text-base text-muted-foreground mb-2">
            Enhance your movie discovery by using the following query parameters
            to filter search results. These parameters allow you to tailor the
            movie data retrieved from our database, ensuring that the results
            meet your specific needs or the preferences of your application's
            users:
          </p>
          <ul className="list-disc list-inside text-base text-muted-foreground">
            <li>
              <strong>genre</strong>: Filter movies by specific genres such as
              comedy, drama, action, etc.
            </li>
            <li>
              <strong>year</strong>: Retrieve movies released in a particular
              year to focus on new releases or classic films.
            </li>
            {/* <li>
              <strong>rating</strong>: Filter movies based on their ratings like
              PG, R, or unrated to suit the audience's age group.
            </li> */}
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
              This response indicates that the request was successful and the
              movies were retrieved.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    status: 200,
                    data: [
                      {
                        id: 1,
                        title: "Inception",
                        genre: "Action",
                        year: 2010,
                      },
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
              404 Not Found - No Movies Found
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when no movies match the search criteria
              in the database.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    status: 404,
                    error: "Movies not found",
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
                    status: 500,
                    error: "Internal server error",
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
        </section>
      </div>
    </RootLayout>
  );
};

export default RefMovies;
