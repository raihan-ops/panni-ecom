export const articlesGroupData = [
    {
        id: 1,
        title: "New York City Tax Updates from NYC CPA",
        articles: [
            {
                id: 1,
                title: "A Business Owner’s Guide to Virtual Currency",
                url: "http://localhost:3000/articles/1"
            },
            {
                id: 2,
                title: "NYS Postpones Key Tax Filing Deadlines including the extension deadline of October 15, 2021",
                url: "http://localhost:3000/articles/2"
            },
            {
                id: 3,
                title: "New Restaurant Return-to-Work Tax Credit Helps New York State Restaurant Owners Staff Up Post-COVID",
                url: "http://localhost:3000/articles/3"
            },
            {
                id: 4,
                title: "The SBA Makes PPP Loan Forgiveness Easier for Freelance Businesses Starting August 4, 2021",
                url: "http://localhost:3000/articles/4"
            },
            {
                id: 5,
                title: "Does Your Business Have Foreign-Based Activities or Partners? These New Reporting Requirements May Affect Your 2021 Taxes",
                url: "http://localhost:3000/articles/5"
            },
        ]
    },
    {
        id: 2,
        title: "Covid-19 Self-Employed Tax Updates from NYC CPA",
        articles: [
            {
                id: 6,
                title: "Hot Topic: Can Business Owners Get the Employee Retention Tax Credit?",
                url: "http://localhost:3000/articles/6"
            },
            {
                id: 7,
                title: "Did You Get a PPP Loan for Your Business? Request Loan Forgiveness Before It’s Too Late",
                url: "http://localhost:3000/articles/7"
            }
        ]
    }
]

export const getArticleById = (id) => {
    return articlesGroupData
        .reduce((articles, group) => {
            return [...articles, ...group.articles]
        }, [])
        .find(article => article.id === id)
}
