import pizzas from "../data.json";

test('the pizza data is correct ', () => {
  expect(pizzas).toMatchSnapshot();
  expect(pizzas).toHaveLength(4);
  expect(pizzas.map(pizza => pizza.name)).toEqual([
    "Chicago Pizza",
    "Neapolitan Pizza",
    "New York Pizza",
    "Sicilian Pizza"
  ]);
});

for (let i = 0; i < pizzas.length; i += 1) {
  test(`pizza[${i}] should have all properties`, () => {
    expect(pizzas[i]).toHaveProperty('id');
    expect(pizzas[i]).toHaveProperty('name');
    expect(pizzas[i]).toHaveProperty('image');
    expect(pizzas[i]).toHaveProperty('desc');
    expect(pizzas[i]).toHaveProperty('price');
  });
}

test('mock implementation of a basic function', () => {
  const mock = jest.fn(() => 'I am a mock function');
  /* console.log(mock); will list of functions related to mock*/
  expect(mock("Calling my mock function!")).toBe("I am a mock function");
  expect(mock).toHaveBeenCalledWith("Calling my mock function!")
});

test('mock return value of a function one time', () => {
  const mock = jest.fn();
  mock.mockReturnValueOnce("Hello").mockReturnValueOnce("there!");
  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);

  mock("Hello", "there", "Sayff!");
  expect(mock).toHaveBeenCalledWith("Hello", "there", "Sayff!");

  mock("Sayf");
  expect(mock).toHaveBeenLastCalledWith("Sayf");
});

test('mock implementation of a function', () => {
  const mock = jest.fn().mockImplementation(() => "UK");
  expect(mock("Location")).toBe("UK");
  expect(mock).toHaveBeenCalledWith("Location");
});


test('spying using original implementation', () => {
  const pizza = {
    name: n => `Pizza name: ${n}`
  };

  const spy = jest.spyOn(pizza, "name");
  expect(pizza.name("cheese")).toBe("Pizza name: cheese");
  expect(spy).toHaveBeenCalledWith("cheese");
});

test('spying using mock implementation', () => {
  const pizza = {
    name: n => `Pizza name: ${n}`
  };

  const spy = jest.spyOn(pizza, "name");
  spy.mockImplementation(n => "Crazy Pizza!!");

  expect(pizza.name("cheese")).toBe("Crazy Pizza!!");
  expect(spy).toHaveBeenLastCalledWith("cheese");

  spy.mockRestore();
  expect(pizza.name("cheese")).toBe("Pizza name: cheese");
});

test('pizza returns new york last', () => {
  const pizza1 = pizzas[0];
  const pizza2 = pizzas[1];
  const pizza3 = pizzas[2];

  const pizza = jest.fn(currentPizza => currentPizza.name);
  pizza(pizza1);
  pizza(pizza2);
  pizza(pizza3);
  expect(pizza).toHaveLastReturnedWith("New York Pizza");
});

test('pizza data has new york pizza and matches as an object', () => {
  const newYorkPizza = {
    "id": 3,
    "name": "New York Pizza",
    "image": "/images/ny-pizza.jpg",
    "desc": "New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.",
    "price": 8
  }
  expect(pizzas[2]).toMatchObject(newYorkPizza);
});

test('expect a promise to relove', async () => {
  const user = {
    getFullName: jest.fn(() => Promise.resolve("Sayf Ab"))
  };

  await expect(user.getFullName("Sayf Ab")).resolves.toBe("Sayf Ab");
});

test('expect a promise to reject', async () => {
  const user = {
    getFullName: jest.fn(() => Promise.reject(new Error("something went wrong!")))
  };

  await expect(user.getFullName("Sayf Ab")).rejects.toThrow("something went wrong!");
})







