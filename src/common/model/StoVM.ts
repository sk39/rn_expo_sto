import {STO} from "@common/model/domainModel";
import {computed} from "mobx";
import moment from "moment";

export default class StoVM implements STO {
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

    constructor(base: STO) {
        Object.assign(this, base)
    }

    @computed
    get canInvest(): boolean {
        return this.status === "offering"
    }

    @computed
    get raisePer(): number {
        const {investedAmount, investmentGoal} = this;
        return (Number(investedAmount) / Number(investmentGoal));
    }

    @computed
    get raisePerText(): string {
        return (this.raisePer * 100).toFixed(1);
    }

    @computed
    get daysToGo(): number {
        return Math.max(moment(this.closeDate).diff(moment(), "d"), 0)
    }

    @computed
    get imageSource() {
        const {image, localImage} = this;
        if (image) {
            return {uri: image}
        } else {
            return localImage
        }
    }
}
