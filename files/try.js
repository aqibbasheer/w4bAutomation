// Import necessary packages
const { element } = require("wd/lib/element-commands");
const { remote } = require("webdriverio");
const { promisify } = require('util');
const { By } = require('webdriverio');
const sleep = promisify(setTimeout);
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
const contacts = [];
// Create a session with the Appium server
async function broad() {
    const client = await remote({
        path: "/wd/hub",
        port: 4723,
        capabilities: desiredCapabilities,
    });
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
        await client.pause(5000)
        //Extract contact information and add to the contacts array
        let isEndReached = false;
        const count = 0;
        let contactItems;

        try {
            while (!isEndReached) {
                //Wait for the contacts list to load
                const listElementContainer = await client.$(`android=new UiSelector().resourceId("android:id/list")`);
                contactItems = await listElementContainer.$$('android.widget.RelativeLayout');
                for (let i = 0; i < contactItems.length - 2; i++) {
                    const item = contactItems[i];
                    try {
                        //const contactNameFetch = await item.$('android=new UiSelector().resourceId("com.whatsapp.w4b:id/chat_able_contacts_row_name")');
                        const contactNameFetch = await item.$('android.widget.TextView');
                        console.log("contactNameFetch.........................................................", contactNameFetch);
                        const contactName = await contactNameFetch.getText();
                        console.log("Contact Name: ", await contactName);
                        // const phoneNumber = await contactItems.$('id:com.whatsapp.w4b:id/title_tv').getText();
                        // console.log(phoneNumber);

                        if (contacts.indexOf(contactName) !== -1) {
                            //await client.pause(1000)
                            continue;
                        }
                        await wait(1000);
                        contacts.push(await contactName);
                        console.log("contacts--------------------", await contacts);
                        await item.click();

                        if (contacts.length == 200) {
                            isEndReached = true
                        }
                        continue;
                    } catch (error) {
                        continue;

                    }

                }
                await scrollScreen();
                //await client.pause(1500)
                await wait(2000);
            }

        } catch (error) {
            console.log("some internal ui error", error);
        }
        // await scrollScreen();
        //console.log("array to push-------------------------", contacts.length)
        // while (isFalse) {
        //   // Scroll to the end of the contact list
        //   await client.touchAction([
        //     { action: 'press', x: 100, y: 400 },
        //     { action: 'moveTo', x: 100, y: 200 },
        //     'release',
        //   ]);
        // }

        //   // Wait for some time to load more contacts (adjust the time as needed)
        //   await client.pause(2000);

        //   // Get the updated number of contacts on the screen
        //   contactItems = await client.$$('android.widget.RelativeLayout');

        //   // Break the loop if no more contacts are loaded
        //   if (contactItems.length === loadedContacts) {
        //     break;
        //   }

        //   // Add the newly loaded contacts to the list
        //   const newContacts = contactItems.slice(loadedContacts);
        //   contacts.push(...newContacts);

        //   // Update the count of loaded contacts
        //   loadedContacts = contactItems.length;
        // }
        //  console.log("contacts-------------",contacts);
        // Process the contacts as needed

        // let contactItems = await client.$$('android.widget.RelativeLayout');

        // console.log("List item for ref", contactItems, " Also the length ", contactItems.length);

        // contactItems.forEach(async (item) => {
        //     let phoneNumber = await item.$('android.widget.TextView');
        //     console.log('phoneNumber----------------------------------------', await phoneNumber.getText());

        //     item.click();
        // })
        await client.pause(5000)
        // Create the new broadcast
        const createBroadcastButton = await client.$('//android.widget.ImageButton[@content-desc="Create"]');
        await createBroadcastButton.click();

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {

    }
    async function scrollScreen() {
        const screenSize = await client.getWindowRect();
        const startX = screenSize.width / 2;
        // const endX = screenSize.width / 2.5;
        const endY = (screenSize.height * 0.2);
        const startY = (screenSize.height * 0.9);
        if (startY <= endY) {
            console.log('Reached the end of the screen');
            return 0;
        }
        await client.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'moveTo', x: startX, y: endY },
            { action: 'release' }
        ]);
    }
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
broad();
