"use client";
import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React from "react";
import ApiDemonstration from "@/app/(client)/components/ApiDemonstration";
import { useSession } from "next-auth/react";

const RefAnimes = () => {
  const { data: session } = useSession();
  const [queryParams, setQueryParams] = React.useState({
    genre: '',
    year: '',
    page: '1',
    limit: '10'
  });

  return (
    <RootLayout>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Discover Animes
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            The Discover Animes endpoint provides a powerful way to find animes
            stored in our database. You can search through a wide array of
            animes using specific criteria such as genre, release year, and user
            ratings. This endpoint is perfect for creating dynamic anime
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
                {`{baseUrl}/animes/discover`}
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
            Enhance your anime discovery by using the following query parameters
            to filter search results. These parameters allow you to tailor the
            anime data retrieved from our database, ensuring that the results
            meet your specific needs or the preferences of your application's
            users:
          </p>
          <ul className="list-disc list-inside text-base text-muted-foreground">
            <li>
              <strong>genre</strong>: Filter animes by specific genres such as
              action, romance, sci-fi, etc.
            </li>
            <li>
              <strong>year</strong>: Retrieve animes released in a particular
              year to focus on new releases or classic series.
            </li>
            <li>
              <strong>page</strong>: Specify the page number for paginated
              results. Default is 1.
            </li>
            <li>
              <strong>limit</strong>: Set the number of animes to return per
              page. Default is 10.
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
              This response indicates that the request was successful and the
              animes were retrieved.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 200,
                    status: "success",
                    message: "Animes fetched successfully",
                    results: {
                      animes: [],
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
              404 Not Found - No Animes Found
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when no animes match the search criteria
              in the database.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 404,
                    status: "error",
                    message: "No animes found",
                    results: [],
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
                    message: "Failed to fetch animes",
                    results: [],
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
            Try out the Discover Animes API with this interactive demonstration.
            Enter the query parameters below and click the button to make an API call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Genre
              </label>
              <input
                onChange={(e) => setQueryParams({ ...queryParams, genre: e.target.value })}
                type="text"
                id="genre"
                name="genre"
                value={queryParams.genre}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Year
              </label>
              <input
                onChange={(e) => setQueryParams({ ...queryParams, year: e.target.value })}
                type="text"
                id="year"
                name="year"
                value={queryParams.year}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="page"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Page
              </label>
              <input
                onChange={(e) => setQueryParams({ ...queryParams, page: e.target.value })}
                type="text"
                id="page"
                name="page"
                value={queryParams.page}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
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
                onChange={(e) => setQueryParams({ ...queryParams, limit: e.target.value })}
                type="text"
                id="limit"
                name="limit"
                value={queryParams.limit}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              />
            </div>
          </div>
          <ApiDemonstration
            token={(session?.user as any)?.tokenApi}
            endpoint="/api/v1/animes/discover"
            queryParams={queryParams}
          />
        </section>
      </main>
    </RootLayout>
  );
};

export default RefAnimes;
