module.exports = {
    getPhoneNumber: function(countryCode) { //await helper.getPhoneNumber("+7"); //<How to call
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    }
};
