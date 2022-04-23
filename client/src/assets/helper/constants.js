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

export function titleCase(str) {
  return str.toLowerCase().split(' ').map((word) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}