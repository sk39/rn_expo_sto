export interface Cashflow {
    name: string;
    symbol: string;
    date: string;
    cashBalance: string;
    totalBalance: string;
}

export interface Balance {
    name: string;
    symbol?: string;
    balance: number;
    balanceBaseCurrency: number;
}

export interface STO {
    name: string;
    symbol: string;
    description: string;
    descriptionDetail: string;
    image?: any;
    localImage?: any;
    maxRaise: string;
    raise: string;
    investors: string;
    closeDate: string;
}
