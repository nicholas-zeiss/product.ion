# product.ion
**Platform:**

A free and public budgeting application commissioned by producers at Refinery29
to replace their google-sheets-based workflow. Production is a permission-based
platform where ordinary users pitch show ideas to be reviewed and approved by producers.
Once a pitch is approved it becomes an expense report to be tracked and added to
by the ordinary users attached to it or a producer.  All data is quantified and graphed for later
analysis and producers can also view month-by-month graphs of their company's expenses.

## Usage

## Installation

All you need to do to get this site up and running locally is a few simple commands:
```
 $ git clone https://github.com/nicholas-zeiss/product.ion.git
 $ cd product.ion/
 $ mkdir app/server/data
 $ npm i
 $ npm start
```
That's it! product.ion will now be running on your localhost at port 7000.


## Implementation
**Stack:**
Libraries and technologies used by Product.ion:
* React w/ Redux for the front-end
* Node running Express w/ for the back-end
* Data is handled by an SQL database using Bookshelf.js
* HighCharts for graphs
* JSON Web Tokens for authentication
* papaparse for csv parsing
* Bootstrap (v3) for styling


**File Structure**
* app - main logic
  * client - Front-end
    1. actions - Redux action creators
    2. components - Redux smart/dumb components
    3. data - Reusable objects and labels
    4. reducers - Redux logic for changing store
    5. styles - Custom CSS
    6. utils - Server calls and other misc. logic
    7. production.js - Main loading logic
    8. store.js - Redux store creator
  * server - Back-end
    1. controllers - Logic for modifying Bookshelf models
    3. models - Linking of SQL tables to Bookshelf models
    4. db.js - Database creation and connection
    5. routes.js - API endpoints for server
    6. server.js - Runs the back-end

