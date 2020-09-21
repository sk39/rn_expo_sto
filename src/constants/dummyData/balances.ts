import sto from "@constants/dummyData/sto";

function token(index, amount) {
    const item = sto[index];
    return {
        name: item.name,
        symbol: item.symbol,
        balance: amount,
        balanceBaseCurrency: amount * item.offeringPrice
    }
}

export const ownTokens = [
    token(0, 30),
    token(1, 75),
];

export const onOrderTokens = [
    token(4, 82),
];

export const summary = [
    {
        name: 'Deposit',
        balanceBaseCurrency: 32760
    },
    {
        name: 'Funded',
        balanceBaseCurrency: _.reduce(ownTokens, (sum, item) => {
            return sum + item.balanceBaseCurrency
        }, 0),
    },
    {
        name: 'On order',
        balanceBaseCurrency: _.reduce(onOrderTokens, (sum, item) => {
            return sum + item.balanceBaseCurrency
        }, 0),
    }
];
