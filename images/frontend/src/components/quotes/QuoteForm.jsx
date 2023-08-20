import React, { useState } from "react";

function QuoteForm({ userId }) {
  const [quote, setQuote] = useState("");

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
      } else {
        console.log("Quote posted successfully!");
        setQuote(""); 
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
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
