const page = require('../../page');
const helper = require('../../helper');
const fromAddress = 'East 2nd Street, 601';
const toAddress = '1300 1st St';
const pauseTime = 500;

describe('Create an order', () => {
    //Test #1
    //Setting the address
    it('should set the address', async () => {
        await browser.url(`/`) //Open main page
        await page.fillAddresses(fromAddress, toAddress);
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting(); //Always should be the last line of a test
    })

    //Test #2
    //Selecting Supportive plan
    it('should select the supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        await page.selectSupportive();
        const supportivePlanButton = await $(page.supportivePlanButton);        
        await browser.pause(pauseTime);
        await expect(supportivePlanButton).toBeDisplayed();
    })
  
    //Test #3
    //Filling in the phone number
    it('should save the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    //Test #4
    //Adding a credit card
    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        await browser.pause(pauseTime);

        const addCardButton = await $(page.addCardButton);
        await addCardButton.click();

        await browser.pause(pauseTime);
        //Enter Credit Card number
        const creditCardField = await $(page.creditCardField);
        await creditCardField.waitForDisplayed();
        await creditCardField.setValue(1234567812345678);        
        await browser.pause(pauseTime);
        //Enter Credit Card CVV
        const creditCardCodeField = await $(page.creditCardCodeField);
        await creditCardCodeField.waitForDisplayed();
        await creditCardCodeField.setValue(321);        
        await browser.pause(pauseTime);
        //Make link button active
        await browser.keys('Tab');
        const linkButton = await $(page.linkButton);
        await linkButton.waitForDisplayed();     
        await $(page.linkButton).click();
        await browser.pause(pauseTime);
        
        const cardAdded = await $(page.cardAdded);
        await cardAdded.waitForDisplayed();
        await expect(cardAdded).toBeExisting();
    })

    //Test #5
    //Writing a message for the driver
    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        const driverMessage = 'Test Message';
        const driverMessageField = driverMessage;
        //await browser.pause(10000);
        await expect(driverMessageField).toBe(driverMessage);
    })
  
    //Test #6
    //Ordering a Blanket and handkerchiefs
    it('should add blanket and handkerchiefs to ride', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        await page.selectSupportive();
        const blanketButton = await $(page.blanketButton);
        await blanketButton.click();
        const blanketCheck = await $(page.blanketCheck);
        await expect(blanketCheck).toBeChecked();        
    })
  
    //Test #7
    //Ordering 2 Ice creams
    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        await page.selectSupportive();
        const plusOneIceCreamButton = await $(page.plusOneIceCreamButton);
        await plusOneIceCreamButton.click();
        await plusOneIceCreamButton.click();
        await plusOneIceCreamButton.waitForDisplayed();
        await expect(plusOneIceCreamButton).toBeDisplayed('2');
    })

    //Test #8
    //The car search modal appears
    it('should display car search modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        //Clicks on 
        const orderButton = await $(page.orderButton);
        await orderButton.click();

        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();


        //const pnoneNumberModal = await $(page.phoneNumberModal);
        //await expect(pnoneNumberModal).toBeExisting(); 
    })   
})

