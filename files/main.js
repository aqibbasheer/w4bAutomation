const wdio = require('webdriverio');

async function waitUntilDisplayed(element, timeout = 10000, interval = 1000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await element.isDisplayed()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error(`Element not displayed after ${timeout} milliseconds.`);
}

async function automateWhatsAppBroadcast() {
  // Set desired capabilities for your Android device and app
  const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: 'Android',
      deviceName: 'TECNO-KC2',
      appPackage: 'com.whatsapp.w4b',
      appActivity: 'com.whatsapp.HomeActivity',
      noReset: true,
      fullReset: false,
    }
  };

  // Initialize the driver
  const client = await wdio.remote(opts);

  try {







    // // Wait for WhatsApp Business to load
    // await client.pause(5000);

    // // Click on the more options button
    // const moreOptionsButton = await client.$('//android.widget.ImageView[@content-desc="More options"]');
    // await moreOptionsButton.click();

    // // Click on the new broadcast option
    // const newBroadcastOption = await client.$('//android.widget.TextView[@text="New broadcast"]');
    // await newBroadcastOption.click();

    // // Wait for the contact list to load
    // await client.pause(5000);;

    // //Found the list items container that is message list container
    // const listElementContainer = await client.$(`android=new UiSelector().resourceId("android:id/list")`);

    // //Lets try to log each sigle contact
    // let contactItems = await listElementContainer.$$('android.widget.RelativeLayout');
    
    // console.log("List item for ref", contactItems, " Also the length ", contactItems.length);

    // // Lets get dimensions of one element
    // let oneElementDimensions = await contactItems[0].getSize();
    // console.log("One element " , oneElementDimensions );
    // let heightOFOneContactItem = oneElementDimensions.height;

    // let startX = 0, startY = 0 ,endX = 0 , endY = 0;
    // const SCROLL_ADJ_FACTOR = 1.04;
    //Let iterate over each contact
    // contactItems.forEach(async (item) => {
    //   let phoneNumber = await item.$('android.widget.TextView');
    //   console.log('phoneNumber----------------------------------------', await phoneNumber.getText());

    //   item.click();
      //         scrollScreen();
      // await client.pause(2000);

      // if(index % 4 == 0){
      //   // let totalScrollHeight = heightOFOneContactItem*4;
      //   // endX = startX;
      //   // endY = startY+totalScrollHeight;

      //   // await client.swipe({startX, startY, endX, endY, duration: 1000})
      //   // client.touchScroll(endX , endY );
      //   // var touchAction = client.long
      //   //   .longPress({ x: 0, y: 1000 })
      //   //   .moveTo({ x: 0, y: 10 })
      //   //   .release();
      //   // await touchAction.perform();
      //   // const startPercentage = 10;
      //   // const endPercentage = 90;
      //   // const anchorPercentage = 50;

      //   // const { width, height } = await client.getWindowSize();
      //   // console.log("Window width " , width , " Window height " , height );

      //   // const anchor = height * anchorPercentage / 100;        
      //   // const startPoint = width * startPercentage / 100;
      //   // const endPoint = width * endPercentage / 100;
      //   // // await client.touchPerform([
      //   //   {
      //   //     action: 'press',
      //   //     options: {
      //   //       x: startPoint,
      //   //       y: anchor,
      //   //     },
      //   //   },
      //   //   {
      //   //     action: 'wait',
      //   //     options: {
      //   //       ms: 100,
      //   //     },
      //   //   },
      //   //   {
      //   //     action: 'moveTo',
      //   //     options: {
      //   //       x: endPoint,
      //   //       y: anchor,
      //   //     },
      //   //   },
      //   //   {
      //   //     action: 'release',
      //   //     options: {},
      //   //   },
      //   // ]);


      // }


      // keeping a copy of location
      // let location = await item.getLocation();
      // startX = location.x;
      // startY = location.y;
    // })

    // const container = await client.$(`android=new UiSelector().resourceId("com.whatsapp.w4b:id/contact_selector")`);

    // // Find all contact elements within the container
    // const contactElements = await container.$$('android=new UiSelector().className("android.widget.RelativeLayout")');

    // // Iterate over the contact elements and retrieve their text
    // for (const contactElement of contactElements) {
    //   const contactText = await contactElement.getText();
    //   console.log(contactText);
    // }
    // console.log("after.............................................");
    // console.log("contactElements",contactElements);

    // Iterate over the list of contact elements and perform actions
    // for (let contactElement of contactElements) {
    //   // Perform actions on each contact element
    //   // For example, you can print the text of each contact element
    //   const contactText = await contactElement.getText();
    //   console.log(contactText);
    // }


    // Wait for the contact list to finish loading

  //   await client.pause(5000)
  //   // Create the new broadcast
  //   const createBroadcastButton = await client.$('//android.widget.ImageButton[@content-desc="Create"]');
  //   await createBroadcastButton.click();
  // } catch (error) {
  //   console.error('An error occurred:', error);
  // } finally {
  //   // Close the driver session
  //   //await client.deleteSession();
  // }
  // async function scrollScreen() {
  //   const screenSize = await client.getWindowRect();
  //   const startX = screenSize.width / 2;
  //   const startY = screenSize.height * 0.8;
  //   const endY = screenSize.height * 0.2;
  //   await client.touchAction([
  //     { action: 'press', x: startX, y: startY },
  //     { action: 'wait', ms: 1000 },
  //     { action: 'moveTo', x: startX, y: endY },
  //     { action: 'release' }
  //   ]);
  // }
}catch{
  
}


}

// Run the script
automateWhatsAppBroadcast();
