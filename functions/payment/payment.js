// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const stripe_secret_key = require('stripe')('sk_test_51ENNpZAZdf6DzuCPEK0RkniNxh8bmGzlNaao1gSEwb0XdFYqAFILg2tS2L45WXlhebJsNBCY1cskvZBOljZTwyGB00emVGQVtu');
exports.handler = async (event, context) => {
    try {
        const paymentIntent = await stripe_secret_key.paymentIntents.create({
            amount: 500,
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
        })
        return {
            statusCode: 200,
            body: JSON.stringify({ client_secret: paymentIntent.client_secret })
        }
    }
    catch (err) {
        console.log(err)
        return { statusCode: 500, body: err.toString() }
    }
};