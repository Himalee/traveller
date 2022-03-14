# Traveller - Smart front end

## Goals

- [x] Allow the user to search for cities using the provided input.
- [x] Display the cities found on the home page.
- [x] Allow the user to set the visited/wishlist state of a city to `true`/`false` via API requests.
- [x] Cities that have visited/wishlist set to `true` should then appear on their respective pages.

## Install and run

```
npx lerna bootstrap
yarn start:all
```

## Testing

For the unit tests, run:
```
yarn test
```

## Info

### API

We have provided both a REST and a GraphQL API, you are free to use whichever you are most comfortable with in your solution. You can find documention for these at the following URLS:

- REST - [http://localhost:4000/rest](http://localhost:4000/rest)
- GraphQL - [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Client

After running the client you will find a home page with an input field that is currently non-functional as well an empty wish list and visited pages.

We have provided a few packages that will help you in your solution:

- If you choose to use GraphQL we have added [Apollo Client](https://www.apollographql.com/docs/react).
- For testing, we have provided [Jest](https://jestjs.io)/[React Testing Libary](https://testing-library.com/docs/react-testing-library/intro).
- For styling, you will find the component library [Chakra UI](https://chakra-ui.com).

## What we're looking for

- Use of abstractions where they make sense (DRY).
- Sensible choices regarding performance.
- Functionality tested.
- An accessible solution.
- We use TypeScript and would be happy to see a well typed solution, however if you're not comfortable with this feel free to use JavaScript.

## Improvements

- Add integration testing for 'happy paths':
  - Given I am a user, when I search for a city, then I see the listed city.
  - Given I have searched for a city, when I select to add a city to my wishlist, and I navigate to /wish-list, then I see the city listed.
  - Given I have searched for a city, when I select to add a city to my visited list, and I navigate to /visited, then I see the city listed.
  - Given I am a user, when I select dark mode, then I see the page in dark mode.
- Improve messaging on visited and wish list pages when no cities are listed.
- Extend error and loading states to visited and wish list pages.
- Give user the ability to remove cities on visited and wish list pages.
