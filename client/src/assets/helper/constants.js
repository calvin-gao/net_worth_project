export class Asset {
  name = "";
  amount = 0.0;

  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

export class Total{
  currentSum = 0.0;

  constructor(totalSum){
    this.currentSum = totalSum;
  }
}

