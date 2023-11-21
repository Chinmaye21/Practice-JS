class Calculator {
    constructor(value) {
        this.value = value;
    }
    add(num) {
        this.value += num;
        return this;
    }
    sub(num) {
        this.value -= num;
        return this;
    }
    mul(num) {
        this.value = this.value * num;
        return this;
    }
    div(num) {
        this.value = this.value / num;
        return this;
    }
}

const obj = new Calculator(0);
obj.add(10).add(10);
console.log(obj.value);

const obj2 = new Calculator(0);
obj2.add(10).sub(4).div(3).mul(2);
console.log(obj2.value);