class Stack {
  constructor() {
    this.top = -1;
    this.items = {};
  }
  get peek() {
    return this.items[this.top];
  }

  push(value) {
    this.top++;
    this.items[this.top] = value;
  }

  pop() {
    delete this.items[this.top];
    this.top--;
  }
}

describe("My stack", () => {
  let stack;

  // each iteration of the following "it", it will declare a new instance 
  beforeEach(() => {
    stack = new Stack();
  });


  it("is created empty", () => {
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
  });

  it("can push an item to the top", () => {
    stack.push("🍖");
    expect(stack.top).toBe(0);
    expect(stack.peek).toBe("🍖");
  });

  it("can pop an item off the top", () => {
    stack.pop();
    expect(stack.top).toBe(-2);
    expect(stack.peek).toBe(undefined);
  });
});
