import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAPIRequest = (endpoint, mockData) => {
  const mock = new MockAdapter(axios);

  mock.onGet(endpoint).reply(config => {
    console.log(config);
    return [
      200,
      JSON.stringify({
        hotels: mockData.slice(config.params.start, config.params.size)
      })
    ];
  });
};
export default mockAPIRequest;
