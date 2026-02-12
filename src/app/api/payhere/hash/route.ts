import { NextResponse } from 'next/server';
import { generatePayHereHash } from '@/lib/payhere';

export async function POST(req: Request) {
    try {
        const { order_id, amount, currency } = await req.json();

        const merchantId = process.env.PAYHERE_MERCHANT_ID;
        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

        if (!merchantId || !merchantSecret) {
            console.error('PayHere credentials missing:', { merchantId: !!merchantId, merchantSecret: !!merchantSecret });
            return NextResponse.json({ error: 'PayHere credentials not configured' }, { status: 500 });
        }

        const hash = generatePayHereHash(
            merchantId,
            order_id,
            amount,
            currency,
            merchantSecret
        );

        return NextResponse.json({ hash, merchantId });
    } catch (error) {
        console.error('Hash generation error:', error);
        return NextResponse.json({
            error: 'Failed to generate hash',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
