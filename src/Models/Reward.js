class RewardModel {
    constructor(position, amount, imgUrl, currency, type) {
        this.position = position;
        this.amount = amount;
        this.imgUrl = imgUrl;
        this.title = [];
        this.currency = currency;
        this.type = type;
    }
}

export default RewardModel;