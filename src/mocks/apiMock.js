import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAPIRequest = (endpoint, mockData) => {
  const mock = new MockAdapter(axios, { delayResponse: 1000 });

  mock.onGet(endpoint).reply(config => {
    let { start, size, filter } = config.params;
    const hotelsList = filter
      ? mockData.filter(hotel => hotel.region === filter)
      : [...mockData];
    const hotelsQuantity = hotelsList.length;
    const lastHotelIndex = start + size;
    const hotels = hotelsList.slice(start, lastHotelIndex);

    const nextIndex = lastHotelIndex < hotelsQuantity ? lastHotelIndex : null;

    return [
      200,
      JSON.stringify({
        hotels: hotels,
        nextHotelIndex: nextIndex,
        total: hotelsQuantity
      })
    ];
  });
};
export default mockAPIRequest;
