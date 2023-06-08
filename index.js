// Import necessary packages
const { remote } = require("webdriverio");
const { promisify } = require('util');;
const sleep = promisify(setTimeout);
const { MongoClient, ServerApiVersion } = require('mongodb');
// Set desired capabilities for your Android device
const desiredCapabilities = {
  platformName: "Android",
  deviceName: "TECNO-KC2",
  appPackage: "com.whatsapp.w4b",
  appActivity: "com.whatsapp.HomeActivity",
  automationName: "UiAutomator2",
  noReset: true,
  fullReset: false,
};

//main function
async function broad() {
  // Create a session with the Appium server
  const client = await remote({
    path: "/wd/hub",
    port: 4723,
    capabilities: desiredCapabilities,
  });
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const uri = "mongodb+srv://aqibbasheer1078:ZE2eBIZW251vT0qF@broadcast.4jx6hon.mongodb.net/?retryWrites=true&w=majority";
  const Mongoclient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  //set global variables to use
  let isEndGlobal = false;
  let globelCount = 0;
  //connect to mongoclient 
  await Mongoclient.connect();
  //call function 
  while (!isEndGlobal) {
    await updateBroadcastName()
  }


  //function for create broadcast and update broadcast name
  async function updateBroadcastName() {
    try {
      // Wait for the more options button to be displayed
      await client
        .$('//android.widget.ImageView[@content-desc="More options"]')
        .waitForDisplayed();

      // Click on the more options button
      await client
        .$('//android.widget.ImageView[@content-desc="More options"]')
        .click();

      // Wait for the new broadcast button to be displayed
      await client
        .$('//android.widget.TextView[@text="New broadcast"]')
        .waitForDisplayed();

      // Click on the new broadcast button
      await client.$('//android.widget.TextView[@text="New broadcast"]').click();
      //Wait for the contacts list to load
      await client.pause(2000)
      const globalList = await client.$(`android.widget.FrameLayout`);
      await globalList.waitForDisplayed();
      console.log("length of list -------------------------------------------", globalList.length)

      //get page source 
      let initialPageSource = await client.getPageSource();
      //isEnd is use to check then end of screen
      let isEnd = false;
      //use to iterate loop for some count value
      let isEndReached = false;
      let count = 0;
      //let contactItems;
      try {
        while (!isEnd) {
          while (!isEndReached) {
            //Wait for the contacts list to load
            const listElementContainer = await client.$(`android=new UiSelector().resourceId("android:id/list")`);
            // let page = await client.getPageSource();
            // console.log("page--------------------------------------------", page);
            //get all elements in that list listElementContainer
            contactItems = await listElementContainer.$$('android.widget.RelativeLayout');
            //iterate for each element 
            for (let i = 0; i < contactItems.length - 2; i++) {
              const item = contactItems[i];
              try {
                //get contact heading
                const contactNameFetch = await item.$(`//android.widget.TextView[@resource-id="com.whatsapp.w4b:id/chat_able_contacts_row_name"]`)
                //console.log("contactNameFetch.........................................................", contactNameFetch);
                const contactName = await contactNameFetch.getText();
                console.log("Contact Name: ", contactName);
                // const phoneNumber = await contactItems.$('id:com.whatsapp.w4b:id/title_tv').getText();
                // console.log(phoneNumber);
                try {
                  //connect with Database
                  const myDB = await Mongoclient.db("broadcast");
                  const myColl = await myDB.collection("contactsNames");
                  //find in DB 
                  const findResult = await myColl.find({ contact__name: contactName }).toArray();
                  console.log("------------------------------------------------------------", findResult);
                  if (findResult.length > 0) {
                    continue;
                  }
                  else {
                    // if (contacts.indexOf(contactName) !== -1) {
                    //   //await client.pause(1000)
                    //   continue;
                    // }
                    // contacts.push(await contactName);
                    // console.log("contacts--------------------", await contacts);
                    await wait(500);
                    count++;
                    if (count <= 100) {
                      const doc = { contact__name: contactName };
                      const result = await myColl.insertOne(doc);
                      await item.click()

                    }
                    else {
                      isEndReached = true
                      isEnd = true;
                    }

                  }


                } catch (error) {
                  console.log("error-----------", error);
                  continue;
                }

              } catch (error) {
                console.log("error to connect with mongoDB", error)
                continue;
              }

            }
            //scroll the screen
            await scrollScreen();
            // Wait for the page to load after scrolling
            await wait(1000);
            const currentPageSource = await client.getPageSource();

            if (currentPageSource === initialPageSource) {
              console.log("Reached the end of the screen");
              isEnd = true;
              isEndReached = true;
              isEndGlobal = true;
            } else {
              initialPageSource = currentPageSource;
              console.log("Still scrolling...");
            }
          }

        }

      } catch (error) {
        console.log("some internal ui error", error);
      }

      await wait(2000)
      // call the function create and update name for broadcast
      //click on the tick button for crating broadcast
      const createBroadcastButton = await client.$('//android.widget.ImageButton[@content-desc="Create"]');
      await createBroadcastButton.click();
      //increament count
      globelCount++;
      //click on heading
      const conversation = await client.$(`//android.widget.LinearLayout[@resource-id="com.whatsapp.w4b:id/conversation_contact"]`);
      await conversation.click();
      //click more option 3 doteed button
      await client
        .$('//android.widget.ImageView[@content-desc="More options"]')
        .waitForDisplayed();
      await client
        .$('//android.widget.ImageView[@content-desc="More options"]')
        .click();
      //click on change broadcast list name
      const listName = await client.$("//android.widget.TextView[@text='Change broadcast list name']");
      await listName.click();
      //select element edit text
      const editName = await client.$(`//android.widget.EditText[@resource-id="com.whatsapp.w4b:id/edit_text"]`);
      //set broadcast name here
      let newBroadcastName = `BroadCast_${globelCount}`;
      await editName.sendKeys([newBroadcastName]);
      //click to ok button for saving changes
      const clickOk = await client.$(`//android.widget.Button[@resource-id="com.whatsapp.w4b:id/ok_btn"]`);
      await clickOk.click();
      //click to backbutton
      const backScreen = await client.$(`//android.widget.ImageButton[@content-desc="Navigate up"]`);
      await backScreen.click()
      //again click to back button for home screen
      const backToHome = await client.$(`//android.widget.Button[@content-desc="Navigate up"]/android.widget.ImageView`);
      await backToHome.click()


    } catch (error) {
      console.error('An error occurred:', error);
    } finally {

    }

  }
  //scroll screen function
  async function scrollScreen() {
    const screenSize = await client.getWindowRect();
    const startX = screenSize.width / 2;
    const endY = (screenSize.height * 0.2);
    const startY = (screenSize.height * 0.8);
    if (startY <= endY) {
      console.log('Reached the end of the screen');
      //isEndReached = true;
    }
    await client.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'moveTo', x: startX, y: endY },
      { action: 'release' }
    ]);
  }
  // function for promise based wait 
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
broad();
