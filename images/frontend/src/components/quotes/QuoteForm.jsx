import React, { useState } from "react";
import "./quoteForm.scss";

/**
 * QuoteForm is a component that allows users to post a new quote.
 *
 * @component
 * @param {string} userId - The ID of the logged-in user.
 *
 * @example
 * <QuoteForm userId="12345" />
 */
function QuoteForm({ userId }) {
  const [quote, setQuote] = useState("");

  /**
   * Handles the quote submission.
   * Makes an API call to post the quote. If successful, resets the quote input.
   * If unsuccessful, shows an error alert.
   *
   * @async
   * @function
   */
  const handleQuoteSubmit = async () => {
    try {
      const response = await fetch("http://localhost:80/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Error posting the quote:", data.message);
        alert("Error posting the quote. Please try again.");
      } else {
        console.log("Quote posted successfully!");
        alert("Quote posted successfully! Please refresh the page to view it.");
        setQuote("");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="quote-form-container">
      <h2>Post a Quote</h2>
      <div>
        <label>
          Quote:
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Enter your quote here"
          />
        </label>
      </div>
      <div>
        <button onClick={handleQuoteSubmit}>Post Quote</button>
      </div>
    </div>
  );
}

export default QuoteForm;
