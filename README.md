# CLI Notes

A command line tool that fetches and displays the first 20 even numbered TODO's from a remote API.

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Description

This tool consumes the first 20 even numbered TODO's in the most performant way and outputs the title and whether it is completed or not.  

TODO at index 1 can be accessed at: https://jsonplaceholder.typicode.com/todos/1  

TODO at index 2 can be accessed at: https://jsonplaceholder.typicode.com/todos/2

## Prerequisites

- Node.js
- npm

## Installation

Clone the repo using the following command:

```bash
git clone https://github.com/ukrocks007/cli_notes.git
```

Change directory to cli_notes

```bash
cd cli_notes
```

Install dependancies

```bash
npm install
```

## Usage

You can run the following command to get the usage of the cli

```bash
node index.js -h
```

It should print following,

```
Usage: node index.js [-s|-h]
Use -s to fetch todos serially
Use -h to print this help message
```

You can run the tool in two modes (default: parallel)
1. Serial Mode
2. Parallel Mode

### Serial Mode

In serial mode the todos are accessed one after other. In cases where there are network delay, timeouts, rate limits, etc. serial mode proves to be faster and more efficient.

To run the cli in serial mode you can run,

```bash
node index.js -s
```

### Parallel Mode

In parallel mode all the requests are send in non blocking manner, making it most efficient. In case of failure due to network issues, the request are retries with exponential backoff.

To run the cli in parallel mode you can run,

```bash
node index.js
```

## Testing

To test the codebase you case run the following command

```bash
npm run test
```

To get the code coverage report you can run

```bash
npm run cover
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
