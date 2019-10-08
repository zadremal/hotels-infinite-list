import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAPIRequest = (endpoint, mockData) => {
  const mock = new MockAdapter(axios, { delayResponse: 2000 });

  mock.onGet(endpoint).reply(config => {
    let { start, size } = config.params;
    const hotelsList = [...mockData];
    const hotels = hotelsList.splice(start, size);

    const nextHotelIndex = start + size;
    const nextIndex = mockData[nextHotelIndex] ? nextHotelIndex : null;

    return [
      200,
      JSON.stringify({
        hotels: hotels,
        nextHotelIndex: nextIndex,
        total: mockData.length
      })
    ];
  });
};
export default mockAPIRequest;
