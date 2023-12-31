import React, { useState, useEffect } from "react";
import "./quoteList.scss";

/**
 * QuoteList is a component that fetches and displays a list of quotes.
 *
 * @component
 *
 * @example
 * <QuoteList />
 */
function QuoteList() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    /**
     * Fetches quotes from the backend and updates the state.
     *
     * @async
     * @function
     */
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://localhost:80/quotes");
        if (!response.ok) {
          throw new Error("Failed to fetch quotes.");
        }
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="quote-list-container">
      <h2>Quotes</h2>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            "{quote.quote}" - {quote.username || "Anonymous"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuoteList;
