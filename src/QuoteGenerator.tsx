import axios from "axios"
import { useEffect, useState } from "react"

const quotesURL = "https://api.quotable.io/random"

type QuoteTypes = {
    content: string
    author: string
}

export const QuoteGenerator = () => {
    const [randomQuotes, setRandomQuotes] = useState<QuoteTypes>(
        [] as number & string
    )

    const updateQuote = async () => {
        try {
            const response = await axios.get(quotesURL)
            const quotes = await response.data
            if (response.status === 200) {
                setRandomQuotes(quotes)
            } else if (response.status === 429) {
                console.log("Error: rate limit exceeded")
            } else {
                console.log(`Error: ${JSON.stringify(response.status)}`)
            }
        } catch (error) {
            console.log(`Oh Oh! Something went wrong: ${JSON.stringify(error)}`)
        }
    }

    useEffect(() => {
        updateQuote()
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="m-4 flex flex-col items-center max-w-sm min-w-[30rem] min-h-[15rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h2>
                <p className="max-h-[10rem] overflow-hidden font-normal text-gray-700 dark:text-gray-400">
                    "{randomQuotes.content}" -{" "}
                    <span className="italic">{randomQuotes.author}</span>
                </p>
                <button
                    className="bg-blue-500 max-w-xs h-12 mx-4 my-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={updateQuote}
                >
                    New Quote
                </button>
            </div>
        </div>
    )
}
