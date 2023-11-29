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

    async function updateQuote() {
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
        <>
            {/*TODO: center card & fix and style button*/}
            <div className="flex justify-center">
                <div className="m-4 flex items-center max-w-sm min-w-[30rem] min-h-[10rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        " {randomQuotes.content} " -{" "}
                        <span className="italic">{randomQuotes.author}</span>
                    </p>
                </div>
                <button onClick={updateQuote}>New Quote</button>
            </div>
        </>
    )
}
