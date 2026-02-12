import crypto from 'crypto';

export const generatePayHereHash = (
    merchantId: string,
    orderId: string,
    amount: number,
    currency: string,
    merchantSecret: string
): string => {
    const formattedAmount = amount.toFixed(2); // Ensure 2 decimal places
    const secret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const data = `${merchantId}${orderId}${formattedAmount}${currency}${secret}`;
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
};

export const verifyPayHereSignature = (
    merchantId: string,
    orderId: string,
    payhereAmount: string,
    payhereCurrency: string,
    statusCode: string,
    md5sig: string,
    merchantSecret: string
): boolean => {
    const secret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const data = `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${secret}`;
    const generatedSig = crypto.createHash('md5').update(data).digest('hex').toUpperCase();
    return generatedSig === md5sig;
};
