"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import Highlight from "react-highlight";
import "highlight.js/styles/atom-one-dark.css";

const ApiDemonstration: React.FC<{ token: string | undefined }> = ({ token }) => {
  const [result, setResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/movies/discover?limit=3&api_token=${token}`
      );
      const data = await response.json();
      setResult(JSON.stringify({ data }, null, 2));
    } catch (error) {
      setResult(JSON.stringify({ error: "Error fetching data" }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary p-4 rounded-md border border-border overflow-auto">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        API Call Example
      </h3>
      <Highlight className="javascript">
        {`import axios from 'axios';

const fetchMovies = async () => {
  try {
    const response = await axios.get('{baseUrl}/api/v1/movies?api_token={token}');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

fetchMovies();`}
      </Highlight>
      <Button onClick={fetchData} disabled={loading || !token} className="mt-4">
        {loading ? "Loading..." : "Start API Call"}
      </Button>
      {result && <Highlight className="json mt-4">{result}</Highlight>}
      {!token && (
        <p className="mt-4 text-sm text-muted-foreground">
          Please sign in and obtain an API token to use this demonstration.
        </p>
      )}
    </div>
  );
}

export default ApiDemonstration