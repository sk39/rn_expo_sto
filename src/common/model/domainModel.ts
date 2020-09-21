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
    balance?: number;
    balanceBaseCurrency: number;
}

export interface STO {
    // Token
    name: string;
    symbol: string;
    summary: string;
    detail: string;
    image?: any;
    localImage?: any;
    // Offering
    closeDate: string;
    offeringPrice: number;
    minInvestment: number;
    maxInvestment: number;
    investmentGoal: number;
    // Offering status
    status: string;
    investors: string;
    investedAmount: number;
}
