"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { RootLayout } from "./layout/RootLayout";

const exampleData = {
  statusCode: 200,
  status: "success",
  message: "Movies successfully retrieved",
  results: {
    movies: [],
    totalPages: 1,
    currentPage: 1,
  },
};

export default function Home() {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Mendapatkan hostname dari window.location
      setHostname(`${window.location.protocol}//${window.location.hostname}`);
    }
  }, []);

  console.log(hostname);

  return (
    <RootLayout>
      <main className="px-4 pb-10 space-y-4">
        <section>
          <h2 className="text-4xl font-semibold mb-2">Introduction</h2>
          <p className="text-md">
            Welcome to the API documentation. This section provides an overview
            of the API, which offers links to streaming movies. Please note that
            these links are not from original sources, and the data provided is
            obtained through web scraping. Currently, the API only supports
            movie streaming.
          </p>
          <p className="text-md mt-4">
            To access the API, please log in to obtain a token or API key, which
            can be used to access the API. The base URL for the API is designed
            to be user-friendly and easy to integrate.
          </p>
          <div className="mt-6 p-4 bg-secondary rounded-md">
            <h3 className="text-xl font-semibold mb-2">Base URL</h3>
            <code className="p-2 bg-card rounded-md text-sm flex items-center justify-between">
              {hostname}/api/v1
              <Button
                variant="ghost"
                size="icon"
                className="active:scale-95 transition-transform duration-150"
              >
                <IoCopy className="w-4 h-4" />
              </Button>
            </code>
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold mb-2">Features</h2>
          <p className="text-md">The API offers the following features:</p>
          <ul className="list-disc list-inside text-base mt-4 space-y-2">
            <li className="text-foreground">
              <strong>Streaming Movies:</strong> The API provides links to
              streaming movies.
            </li>
            <li className="text-foreground">
              <strong>Movie List:</strong> The API provides a list of available
              movies.
            </li>
            <li className="text-foreground">
              <strong>Movie Information:</strong> The API provides detailed
              information about each movie.
            </li>
            <li className="text-foreground">
              <strong>Direct API Access:</strong> The API provides direct access
              to detailed information on IMDb or TMDb.
            </li>
          </ul>
          <div className="mt-6 p-4 bg-secondary rounded-md">
            <h3 className="text-xl font-semibold mb-2">
              More Features Coming Soon
            </h3>
            <p className="text-md">
              The API will have additional features in the future. Please always
              support me to stay motivated to keep updating!
            </p>
          </div>
        </section>
        <section className="mt-6 p-4 bg-secondary rounded-md">
          <h3 className="text-xl font-semibold mb-2">API Data Format</h3>
          <p className="text-md">
            The API returns data in JSON format, and all requests must be made
            over HTTPS.
          </p>
          <pre className="bg-card p-2 rounded-md text-sm">
            <code>{JSON.stringify(exampleData, null, 2)}</code>
          </pre>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">Rate Limiter</h3>
          <p className="text-md">
            To ensure fair usage and prevent abuse, the API implements a rate
            limiter. Each user is allowed a certain number of requests per
            minute.
          </p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Rate Limit Status</h4>
            <p className="text-md">
              You have used 10 out of 60 requests in the last minute.
            </p>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">
              How to Handle Rate Limiting
            </h4>
            <ul className="list-disc list-inside text-base mt-2 space-y-2">
              <li className="text-foreground">
                Implement exponential backoff in your requests.
              </li>
              <li className="text-foreground">
                Monitor the rate limit headers in the API response.
              </li>
              <li className="text-foreground">
                Ensure your application gracefully handles rate limit errors.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </RootLayout>
  );
}
