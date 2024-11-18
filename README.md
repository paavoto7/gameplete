# Gameplete

This is the complete and available fullstack app for [Gameplete](https://gameplete.pages.dev/). It includes bot the deployed frontend and backend.


## What is it
Gameplete is a fullstack web app that makes it easy to view upcoming and anticipated video games. It also displays most popular and top rated games on the front page. Searching for single games is also possible.

## Some techncial details
Gameplete uses the [IGDB](https://www.igdb.com/) API to retrieve information about the above mentioned categories and singular games. In other words, all the data is fetched from their API.

#### Frontend
React was chosen for the frontend due to the familiarity of it to the author as well as for the flexibility of it. The wide availability and range of different additional libraries was a reason as well. Next.js was considered, but ultimately no real upsides of it were seen to be present in this project. Tailwind was chosen to use for CSS for learning purposes as well as the ease of use.

#### Backend
The application uses Hono for Cloudflare pages in the backend. The backend endpoint requests are being validated using Zod.

The function directory serves as the entrypoint for that. Cloudflare pages/workers does not support Node and therefore Express so I decided to migrate to Hono instead of using their native approach. Migrating from Express
to Hono on such a small project seemed very straightforward and manageable, which
it precisely was.

#### Miscellaneous details
Due to the migration mentioned above, the components directory is a bit of a mess. It is better organised in the original frontend repository. Another thing this migration to Hono and Cloudflare caused is that the backend tests don't work anymore.