"use client"
import { RootLayout } from "@/app/(client)/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import ApiDemonstration from "@/app/(client)/components/ApiDemonstration";

const SearchPage = () => {
  const { data: session } = useSession();
  const [queryParams, setQueryParams] = useState({
    query: "",
    page: "1",
    limit: "10",
    year: "",
    genre: "",
    type: ""
  });

  return (
    <RootLayout>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Search Movies and Animes
          </h1>
          <p className="text-base text-muted-foreground mb-4">
            The Search endpoint allows you to search for movies and animes in our database
            based on various criteria. This powerful search functionality enables you
            to find specific items or groups of items that match certain parameters,
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
                {`{baseUrl}/search`}
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
              <strong>query</strong>: The main search term. This can be a title,
              an actor's name, or any other relevant search term.
            </li>
            <li>
              <strong>page</strong>: Specify the page number for paginated
              results. Default is 1.
            </li>
            <li>
              <strong>limit</strong>: Set the number of items to return
              per page. Default is 10.
            </li>
            <li>
              <strong>year</strong>: Filter items by release year.
            </li>
            <li>
              <strong>genre</strong>: Filter items by genre.
            </li>
            <li>
              <strong>type</strong>: Filter search results by type. Available options are 'movies' and 'animes'.
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
              This response indicates that the search was successful and matching items were found.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 200,
                    status: "success",
                    message: "Items found successfully",
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
              404 Not Found - No Items Found
            </h3>
            <p className="text-base text-muted-foreground mb-2">
              This response is returned when no items match the search criteria.
            </p>
            <pre className="p-2 rounded-md bg-secondary">
              <code className="text-base break-all text-foreground">
                {JSON.stringify(
                  {
                    statusCode: 404,
                    status: "error",
                    message: "No items found matching the search criteria",
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
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            API Demonstration
          </h2>
          <p className="mb-4 text-muted-foreground">
            Try out the Search API with this interactive demonstration.
            Adjust the parameters below and click the button to make an API call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Query
              </label>
              <input
                onChange={(e) => setQueryParams({ ...queryParams, query: e.target.value })}
                type="text"
                id="query"
                name="query"
                value={queryParams.query}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Type
              </label>
              <select
                onChange={(e) => setQueryParams({ ...queryParams, type: e.target.value })}
                id="type"
                name="type"
                value={queryParams.type}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="movies">Movies</option>
                <option value="animes">Animes</option>
              </select>
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
                type="number"
                id="year"
                name="year"
                value={queryParams.year}
                className="w-full p-2 rounded-md border border-input bg-background text-foreground"
              />
            </div>
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
            endpoint="/api/v1/search"
            queryParams={queryParams}
          />
        </section>
      </main>
    </RootLayout>
  );
};

export default SearchPage;
