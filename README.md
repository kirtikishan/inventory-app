This project was bootstrapped with Create React App

After you npm install, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This application has been deployed in S3 bucket and distributed using CloudFront and can be accessed through [https://d224lahcfesmxb.cloudfront.net/](https://d224lahcfesmxb.cloudfront.net/). This connects to your backend serverless API's. In order to securely login in your application I have AWS Cognito.

You would get login screen. I have created couple of user for you to login and test the application. Once you login you would see home screen where we show inventory asset details. Each Asset has a minimum of Asset Name, dimensions (Asset Width, Asset Height), status (active, inactive), Shopping Center its associated with as per the requirement. 

You can also search/ filterby AssetName and ShopName. As you select from select box the type of search please enter user input and click search to filter out based upon the exact value (Please use exact value for now to search your data. For example: OhhMedia1 works ohhMedia1 or Ohhmedia1 will give you empty response. For empty string the service returns all the items). We use API (https://n7gqnawcrg.execute-api.us-east-1.amazonaws.com/prod/assets/search) to get the search results. 

In order to add new Shop or Asset you click the links as shown. Each of the respective screen has an userinput to create a new shop or asset. In the creat new asset screen I am calling (https://n7gqnawcrg.execute-api.us-east-1.amazonaws.com/prod/shop) service to populate list of shopping centers where you can store an asset. To Create Asset or Create Shop i have created services :
https://n7gqnawcrg.execute-api.us-east-1.amazonaws.com/prod/shop \
https://n7gqnawcrg.execute-api.us-east-1.amazonaws.com/prod/assets \ 

In order to edit existing asset you can click on the Asset Name. It will fetch your asset from service (https://n7gqnawcrg.execute-api.us-east-1.amazonaws.com/prod/assets/{id}) where id is taken from path parameters. 

As per the requirement you can change the status active/ inactive (i have just given text input for now. Customer should be usually given select option to restrict to two options only).

As per the give requirement:

1. MUST have an API server written in JavaScript (Completed, used lambda's and serverless)
2. MUST have routes for Shopping Centres (Completed, created 4 services CRUD operations)
3. MUST have routes for Assets (Completed, created 4 services CRUD operations)
4. MUST persist data to a database using some flavour of SQL (Completed, Used DynamodDB in this use case).
5. MUST be secured against anonymous access (Completed, Used AWS Congnito and storing data against the customer id, application works with https)
6. MUST contain tests using a testing framework (used serverless-bundle testes only for coupld of test cases)
7. SHOULD track which user makes changes to the data (Completed)
8. SHOULD allow marking Assets “inactive” for when they’re receiving maintenance, and re-activating them later (Completed, currenlty user enters those values)
9. COULD have a UI (but don’t worry about UX) (Completed)
10. COULD support searching for Assets by Name, Shopping Center or Status. (Completed. Havn't done for status but works with Assets and Shopping Center).








