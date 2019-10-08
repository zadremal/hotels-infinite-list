import faker from "faker";

const cities = [
  "Moscow",
  "Saint-Petersburg",
  "NewYork",
  "Sydney",
  "San-Francisco",
  "Berlin",
  "Paris"
];

const getRegion = () => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
};

const getHotelsData = () => {
  let data = [];
  for (let i = 0; i < 50; i) {
    data.push({
      id: ++i,
      name: faker.company.companyName(),
      region: getRegion(),
      price: faker.commerce.price()
    });
  }
  return data;
};

export default getHotelsData;
