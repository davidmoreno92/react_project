class RewardModel {
    constructor(position, amount, imgUrl, title, currency, type) {
        this.position = position ? position : 1;
        this.amount = amount ? amount : 0;
        this.imgUrl = imgUrl ? imgUrl : "";
        this.fileObject = {};
        this.title = title ? title : [];
        this.currency = currency ? currency : "";
        this.type = type ? type : "R";
    }
}

export default RewardModel;