import axios from 'axios'
import { useEffect, useState } from 'react'

const quotesURL = 'https://api.quotable.io/random'

type QuoteTypes = {
    _id: number
    content: string
    author: string
}

export const QuoteGenerator = () => {
    const [randomQuotes, setRandomQuotes] = useState<QuoteTypes>(
        [] as number & string
    )

    async function updateQuote() {
        const response = await axios.get(quotesURL)
        const quotes = await response.data
        setRandomQuotes(quotes)
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
