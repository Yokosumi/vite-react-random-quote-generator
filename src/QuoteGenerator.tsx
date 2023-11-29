import axios from 'axios'
import { useEffect, useState } from 'react'

const quotesURL = 'https://api.quotable.io/random'

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
            }
        } catch (error) {
            console.log(`Oh Oh! Something went wrong: {error}`)
        }
    }

    useEffect(() => {
        updateQuote()
    }, [])
    return (
        <>
            <p>{randomQuotes.content}</p>
        </>
    )
}
