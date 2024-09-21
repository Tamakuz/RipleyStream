import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React from "react";

const SearchPage = () => {
  return (
    <RootLayout>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Search Movies
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            The Search Movies endpoint allows you to search for movies in our database
            based on various criteria. This powerful search functionality enables you
            to find specific movies or groups of movies that match certain parameters,
            making it easy to implement a search feature in your application.
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
                {`{baseUrl}/movies/search`}
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
            Use the following query parameters to customize your search request:
          </p>
          <ul className="list-disc list-inside text-base text-muted-foreground">
            <li>
              <strong>query</strong>: The main search term. This can be a movie title,
              an actor's name, or any other relevant search term.
            </li>
            <li>
              <strong>page</strong>: Specify the page number for paginated
              results. Default is 1.
            </li>
            <li>
              <strong>limit</strong>: Set the number of movies to return
              per page. Default is 10.
            </li>
            <li>
              <strong>year</strong>: Filter movies by release year.
            </li>
            <li>
              <strong>genre</strong>: Filter movies by genre.
            </li>
          </ul>
          <p className="text-base text-muted-foreground mt-2">
            The search results are sorted by relevance to the search query.
          </p>
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
              This response indicates that the search was successful and matching movies were found.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 200,
                    status: "success",
                    message: "Movies found successfully",
                    results: {
                      movies: [],
                      totalResults: 0,
                      totalPages: 0,
                      currentPage: 0,
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
              404 Not Found - No Movies Found
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when no movies match the search criteria.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 404,
                    status: "error",
                    message: "No movies found matching the search criteria",
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
              that prevented the search request from being fulfilled.
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
      </main>
    </RootLayout>
  );
};

export default SearchPage;
