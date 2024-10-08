"use client";
import { RootLayout } from '@/app/(client)/layout/RootLayout'
import { Badge } from '@/components/ui/badge';
import React from 'react'
import ApiDemonstration from "@/app/(client)/components/ApiDemonstration";
import { useSession } from "next-auth/react";

const PopularPage  = () => {
  const { data: session } = useSession();
  const [queryParams, setQueryParams] = React.useState({
    page: '1',
    limit: '1'
  });

  return (
    <RootLayout>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Popular Movies
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            The Popular Movies endpoint provides a curated list of the most
            popular movies in our database. This endpoint returns a collection
            of movies sorted by their popularity, allowing you to showcase
            trending and widely-appreciated films. It's an excellent feature for
            highlighting top movies on your application's homepage or in a
            dedicated popular movies section.
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
                {`{baseUrl}/movies/popular`}
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
            Use the following query parameters to customize your request for
            popular movies. These parameters allow you to control the pagination
            of results, ensuring you get the most relevant data for your needs:
          </p>
          <ul className="list-disc list-inside text-base text-muted-foreground">
            <li>
              <strong>page</strong>: Specify the page number for paginated
              results. Default is 1.
            </li>
            <li>
              <strong>limit</strong>: Set the number of popular movies to return
              per page. Default is 10.
            </li>
          </ul>
          <p className="text-base text-muted-foreground mt-2">
            The movies are automatically sorted by popularity in descending
            order, so you'll always get the most popular movies first.
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
              This response indicates that the request was successful and the
              movies were retrieved.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 200,
                    status: "success",
                    message: "Movies fetched successfully",
                    results: {
                      movies: [],
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
              This response is returned when no movies match the search criteria
              in the database.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 404,
                    status: "error",
                    message: "No movies found",
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
            Try out the Popular Movies API with this interactive demonstration.
            Adjust the parameters below and click the button to make an API call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="page"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Page
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value === '' ? '1' : Math.max(1, Number(e.target.value)).toString();
                  setQueryParams({ ...queryParams, page: value });
                }}
                type="number"
                id="page"
                name="page"
                min="1"
                value={queryParams.page}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label
                htmlFor="limit"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Limit
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value === '' ? '1' : Math.max(1, Number(e.target.value)).toString();
                  setQueryParams({ ...queryParams, limit: value });
                }}
                type="number"
                id="limit"
                name="limit"
                min="1"
                value={queryParams.limit}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <ApiDemonstration
            token={(session?.user as any)?.tokenApi}
            endpoint="/api/v1/movies/popular"
            queryParams={queryParams}
          />
        </section>
      </main>
    </RootLayout>
  );
}

export default PopularPage;