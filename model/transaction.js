export class TransactionModel {




    constructor() {
        this.id = '';
        this.from = 0;
        this.to = 0;
        this.amount = 0;
        this.status = 'pending'
        this.timestamp = Date.now();
    }

}