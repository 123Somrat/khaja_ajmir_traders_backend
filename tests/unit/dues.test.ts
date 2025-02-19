import dueModel from "../../src/models/due/dueSchema";
import dueService from "../../src/lib/due";
import mongoose from "mongoose";


describe("Dues", () => {
  // Mock data
  const allDues = [
    {
      _id: "60f8f1e4b3b2a7d5b4b5b0e4",
      buyerName: "John Doe",
      sellerName: "Jane Smith",
      buyingPrice: 200,
      buyingDate: "2021-07-20T00:00:00.000Z",
      expiredDate: "2021-08-01T00:00:00.000Z",
      createdAt: "2021-07-22T06:45:40.000Z",
      updatedAt: "2021-07-22T06:45:40.000Z",
      __v: 0,
    },
    {
      _id: "60f8f1e4b3b2a7d5b4b5b0e5",
      buyerName: "Alice Doe",
      sellerName: "Bob Smith",
      buyingPrice: 250,
      buyingDate: "2021-07-21T00:00:00.000Z",
      expiredDate: "2021-08-02T00:00:00.000Z",
      createdAt: "2021-07-22T06:45:40.000Z",
      updatedAt: "2021-07-22T06:45:40.000Z",
      __v: 0,
    },
  ];

  // Session type
  let sessionMock: {
    startTransaction: jest.Mock;
    commitTransaction: jest.Mock;
    endSession: jest.Mock;
    abortTransaction: jest.Mock;
  };

  // Mocking mongoose session
  beforeEach(() => {
    sessionMock = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      endSession: jest.fn(),
      abortTransaction: jest.fn(),
    };
    mongoose.startSession = jest.fn().mockReturnValue(sessionMock);
  });

  // Reset mocks
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  // Mock the query chain methods on the Mongoose model
  const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    session: jest.fn().mockReturnValue(allDues), // ✅ Fix: Mock `.session()`
  };

  // Query params
  const queryParams = {
    page: 1,
    limit: 5,
    sortType: "asc",
    sortBy: "expiredDate",
    searchBy: "sellerName",
  };



it("Should return all dues with default query parameters", async () => {
    (dueModel.find as jest.Mock) = jest.fn().mockReturnValue(mockQuery);

    const response = await dueService.allDues({page:0,limit:0,sortType:'',sortBy:'',searchBy:''});

    expect(mongoose.startSession).toHaveBeenCalled();
    expect(sessionMock.startTransaction).toHaveBeenCalled();
    expect(sessionMock.commitTransaction).toHaveBeenCalled();
    expect(sessionMock.endSession).toHaveBeenCalled();
    expect(response).toEqual(allDues);
    expect(sessionMock.abortTransaction).not.toHaveBeenCalled();

})


  it("Should return all dues with provided query parameter", async () => {

    // Mock the find method
    (dueModel.find as jest.Mock) = jest.fn().mockReturnValue(mockQuery);

    const response = await dueService.allDues(queryParams);

    expect(mongoose.startSession).toHaveBeenCalled();
    expect(sessionMock.startTransaction).toHaveBeenCalled();
    expect(sessionMock.commitTransaction).toHaveBeenCalled();
    expect(sessionMock.endSession).toHaveBeenCalled();
    expect(response).toEqual(allDues);
    expect(sessionMock.abortTransaction).not.toHaveBeenCalled();
  });

  it("Should return a empty array if no dues found", async () => {
    const mockQuery = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      session: jest.fn().mockReturnValue([]),
    };

    // Mock the find method
    (dueModel.find as jest.Mock) = jest.fn().mockReturnValue(mockQuery);

    const response = await dueService.allDues({
      page: 1,
      limit: 5,
      sortType: "dsc",
      sortBy: "expiredDate",
      searchBy: "sellerName",
    });

    expect(mongoose.startSession).toHaveBeenCalled();
    expect(sessionMock.startTransaction).toHaveBeenCalled();
    expect(sessionMock.commitTransaction).toHaveBeenCalled();
    expect(sessionMock.endSession).toHaveBeenCalled();
    expect(response).toEqual([]);
    expect(sessionMock.abortTransaction).not.toHaveBeenCalled();
  });
});
