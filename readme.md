# Discover Poetry

Frontend for the [poetryDB](https://github.com/thundercomb/poetrydb) using Vanilla JS

Check it out: [URL](https://melodic-cannoli-36a8b2.netlify.app/)

Features:

- Sort by length of the poem
- Pagination
- Fetch data using two API endpoints

Areas for improvement:

- Data flow needs improvement (e.g: currentData state being mutated globally)
  - Implementing a store would be a fun approach
- JSDOC comments rather than what is currently commented
- Formatting poem text so the line breaks appear typically indicated by a `,` character
- Pagination could have be implemented with a class
- Making this a legitimate website with a bunch of discovery features like the ones listed below:
  - Wikipedia image of the author could show up as well as a little blurb
  - Additional context if the poem is part of a longer narrative or book
