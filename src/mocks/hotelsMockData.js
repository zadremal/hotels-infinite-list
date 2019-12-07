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

const getHotelsMockData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i + 1,
      name: faker.company.companyName(),
      region: getRegion(),
      price: faker.commerce.price()
    });
  }
  return data;
};

export default getHotelsMockData;
