import PageManager from './page-manager';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';


export default class Checkout extends PageManager {

	async onReady() {
        const state = await service.loadCheckout();
        const service = createCheckoutService();
        const module = await checkoutKitLoader.load('checkout-sdk')
        const checkoutId = '0cfd6c06-57c3-4e29-8d7a-de55cc8a9052';
        const state = await service.loadCheckout(checkoutId);
        const state = await service.signInCustomer({ email: 'foo@bar.com', password: 'password123' });
        const state = await service.continueAsGuest({ email: 'foo@bar.com' });
        const fields = state.data.getShippingAddressFields();
        fields.forEach(field => {
            console.log(field);
        });
        const address = {
            firstName: 'Test',
            lastName: 'Tester',
            addressLine1: '12345 Testing Way',
            city: 'Some City',
            provinceCode: 'CA',
            postCode: '95555',
            countryCode: 'US',
            phone: '555-555-5555',
        };
        const state = await service.updateShippingAddress(address);
        const address = state.data.getShippingAddress();
        const options = state.data.getShippingOptions();
        const newState = await service.selectShippingOption(options[address.id].id);
        const state = await service.updateBillingAddress(address);
        const state = await service.applyCoupon('COUPON');
        const state = await service.applyGiftCertificate('GIFT');
        await service.removeCoupon('COUPON');
        await service.removeGiftCertificate('GIFT');

        console.log(state.data.getCheckout());
        console.log(state.data.getCart());
        console.log(state.data.getBillingAddress());
        console.log(state.data.getShippingAddress());
        console.log(state.data.getConfig());
        console.log(state.data.getCustomer());
        console.log(state.data.getCart().email);
        console.log(state.data.getBillingAddress().email);
        console.log(state.data.getShippingAddress());
        console.log(state.data.getShippingOptions());
        console.log(newState.checkout.getSelectedShippingOption());
        console.log(state.data.getBillingAddress());
        console.log(state.data.getOrder().coupon);
        console.log(state.data.getOrder().giftCertificate);



    }
    
    
}