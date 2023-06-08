const { remote } = require('webdriverio');

async function automateW4B() {
  // Set desired capabilities for your Appium session
  const desiredCapabilities = {
    platformName: "Android",
    deviceName: "TECNO-KC2",
    appPackage: "com.whatsapp.w4b",
    appActivity: "com.whatsapp.HomeActivity",
    automationName: "UiAutomator2",
    noReset: true,
    fullReset: false,
  };

  // Initialize the Appium driver
  const driver = await remote({
    protocol: 'http',
    hostname: 'localhost',
    port: 4723, // Change the port if necessary
    path: '/wd/hub',
    capabilities: desiredCapabilities
  });

  try {
    // Open WhatsApp for Business
    

    // Wait for the chat icon to be visible and click it
    
     const chatIcon = await driver.$('//android.widget.ImageButton[@content-desc="New chat"]');
     await chatIcon.isDisplayed();
     await chatIcon.click();

    // Wait for the contact list to be visible
    
    // const contactList = await driver.$$('android.widget.RelativeLayout');
    // await contactList.isDisplayed();
    // await contactList.click();
    // Retrieve contact elements
    const contactElements = await driver.$$('android.widget.RelativeLayout');
    // Loop through the first 20 contacts
    for (let i = 0;  i < contactElements.length; i++) {
      if (i === 0 || i==1) {
        continue; // Skip the first element
      }
      // Click on the contact element
      await contactElements[i].click();

      // Extract the phone number text for the contact
      const phoneNumberElement = await driver.$('id:com.whatsapp.w4b:id/title_tv');
      const phoneNumber = await phoneNumberElement.getText();
      console.log('Phone number:', phoneNumber);

      // Perform any additional tasks with the contact
      // ...

      // Go back to the contact list
      await driver.back();
      await driver.waitUntil(async () => {
        const contactList = await driver.$('id:com.whatsapp.w4b:id/listView');
        return await contactList.isDisplayed();
      }, { timeout: 5000 });
    }
  } catch (error) {
    //console.error('An error occurred:', error);
  } finally {
   // await driver.deleteSession(); // Close the Appium session
  }
}

automateW4B();
