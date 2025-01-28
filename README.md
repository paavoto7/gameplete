# Gameplete

This is the complete and publicly available fullstack app for [Gameplete](https://gameplete.pages.dev/). It includes both the deployed frontend and backend.


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
Migration to Hono and Cloudflare caused the backend tests to stop working.
Adding testing to both the front- and backend is something that should be done in the future.
My commenting philosophy in this project was to make components and functions as readable as possible on their own.
I added comments when they were strictly necessary.