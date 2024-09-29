import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React from "react";

const RefAnimes = () => {
  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
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
      </div>
    </RootLayout>
  );
};

export default RefAnimes;
