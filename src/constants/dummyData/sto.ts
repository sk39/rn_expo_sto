import {STO} from "@common/model/domainModel";
import moment from "moment";

function dummyDate(diffDays) {
    return moment().add(diffDays, "d").format("YYYYMMDD");
}

const base = (name, symbol, isRandomImage?) => {
    const image = isRandomImage ? `https://picsum.photos/510/300?random&d=${symbol}` : null;
    return {
        name,
        symbol,
        image,
        summary: `${name} providers new security token platform solution for financial institution.`,
        detail: "This section is a example security token detail page. You can move to the purchase screen from the button at the bottom of the page.",
    }
};

const offerCond = (goal, percent, investors, days, offeringPrice = 200) => {
    return {
        closeDate: dummyDate(days),
        offeringPrice: offeringPrice,
        minInvestment: offeringPrice,
        maxInvestment: offeringPrice * 1000,
        investmentGoal: goal,
        investedAmount: Number(Number(goal * percent).toFixed(0)),
        investors
    }
}

const data: STO[] = [
    {
        ...base('Bulletin Fund', 'BLT'),
        ...offerCond(20000000, 0.803, 56, 5),
        localImage: require("@assets/sto/bulletin-board-3233653_1280.jpg"),
        status: "offering",
    },
    {
        ...base('Cherry blossoms Fund', 'CBS'),
        ...offerCond(10000000, 0.753, 38, 21, 500),
        localImage: require("@assets/sto/cherry-blossoms-4069596_1280.jpg"),
        status: "offering",
    },
    {
        ...base('NNG Fund', 'NNG'),
        ...offerCond(32000000, 0.674, 103, 19, 250),
        localImage: require("@assets/sto/night-1450087_1280.jpg"),
        status: "offering",
    },
    {
        ...base('Black CAT Fund', 'WCT'),
        ...offerCond(17000000, 0.226, 14, 12, 300),
        localImage: require("@assets/sto/poster-2948045_1280.jpg"),
        status: "offering"
    },
    {
        ...base('EX1 Fund', 'EX1', true),
        ...offerCond(20000000, 0.019, 2, 44, 100),
        status: "offering",
    },
    {
        ...base('EX2 Fund', 'EX2', true),
        ...offerCond(20000000, 0.567, 30, 9),
        status: "offering",
    },
    {
        ...base('EX3 Fund', 'EX3', true),
        ...offerCond(8000000, 0.288, 5, 56, 100),
        status: "offering",
    },
    {
        ...base('EX4 Fund', 'EX4', true),
        ...offerCond(11000000, 0.0, 0, 50),
        status: "waiting",
    },
    {
        ...base('EX5 Fund', 'EX5', true),
        ...offerCond(13600000, 0.0, 0, 365, 300),
        status: "waiting",
    },
    {
        ...base('EXAMPLE6', 'EX6', true),
        ...offerCond(20000000, 0.0, 0, 120),
        status: "waiting",
    },
];

export default data;
