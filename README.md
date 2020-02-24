# superHeroSE
## A Data visualization application using React framework that allows users to create a list of heroes and visualize their powerStats
## See the web app at: https://sttwarrior.github.io/SoSHero/
---

This project requires the following libraries to perform its full effect:
* react@16.12.0
* recharts@1.8.5 (the latest 2.0beta will cause some issues!)
* bootstrap@4.4.1

If you don't have these libraries or not in the same versions, please do:
`npm -i recharts@1.8.5`
`npm -i bootstrap@4.4.1`
`npm -i react@16.12.0`   (You may need to update your node to execute npx, mine is node@v10.17.0)

After installation, please create a new folder, and then create a new React project. For example:
`npx create-react-app my-app
cd my-app
npm start`

Finally, please put file in ./public into the one of your new project, same for the files in ./src.

---

## Before we start
The app fetches data from super hero API (https://www.superheroapi.com/index.html), and visualizes the powerStats of selected heroes.
Because of the Cross-Origin Resource Sharing (CORS), I can't directly access the API.
The API does not add a key as Access-Control-Allow-Origin for every requester, therefore I use third party API (https://cors-anywhere.herokuapp.com/) to access data. The drawback is a huge impact on performance. Sometimes the fetching time can be over 2~3 seconds or even not connected to their server. For local test or development, there are several add-ons that allow us ignoring CORS, which can be another option.

## To use the web app
1. Enter a hero's name, then click "search".
2. The app will present all the matches. Click their photos to select.
3. Hit the button "Add Hero" to add them to your hero list.
4. Those heroes will be added and appear in another row.
5. Select those heros and hit "Go Compare!" to see their powerStat visualized!

## Some other notes
1. Some heroes do not have a photo, the system will use an anonymous one.
2. Some have one or more null in their powerStats. The app will treat it as a zero.
3. This web app is a responsive design. 
