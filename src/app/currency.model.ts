interface ICurrency {
    base?: string;
    date?: string;
    rates?:
    {
        AUD: string,
        BGN: string,
        BRL: string,
        CAD: string,
        CHF: string,
        CNY: string,
        CZK: string,
        DKK: string,
        EUR: string,
        GBP: string,
        HKD: string,
        HRK: string,
        HUF: string,
        IDR: string,
        ILS: string,
        INR: string,
        ISK: string,
        JPY: string,
        KRW: string,
        MXN: string,
        MYR: string,
        NOK: string,
        NZD: string,
        PHP: string,
        PLN: string,
        RON: string,
        RUB: string,
        SEK: string,
        SGD: string,
        THB: string,
        TRY: string,
        USD: string,
        ZAR: string,
    };
}

export class Currency implements ICurrency {
    base?: string;
    date?: string;
    rates?:
        {
            AUD: string,
            BGN: string,
            BRL: string,
            CAD: string,
            CHF: string,
            CNY: string,
            CZK: string,
            DKK: string,
            EUR: string,
            GBP: string,
            HKD: string,
            HRK: string,
            HUF: string,
            IDR: string,
            ILS: string,
            INR: string,
            ISK: string,
            JPY: string,
            KRW: string,
            MXN: string,
            MYR: string,
            NOK: string,
            NZD: string,
            PHP: string,
            PLN: string,
            RON: string,
            RUB: string,
            SEK: string,
            SGD: string,
            THB: string,
            TRY: string,
            USD: string,
            ZAR: string,
        };
    constructor(currency: ICurrency) {
        Object.assign(this, currency);
    }

}
