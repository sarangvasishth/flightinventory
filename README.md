# flightinventory


Step 1. Download ```.env``` file from email and place it in the project root folder.

Step 2. Please have a local mongo server running.

Step 3. Run ```node seeder.js``` from project root to upload data in local mongo instance ```(Database = frontM, Collection='products')```.

Step 4. ```npm start``` from project root folder.

Step 5. Project should be running at ```PORT: 5000```.



Sample API:  ```http://localhost:5000/product?search=mediterranean&page=12&sort=type&order=DESC```
