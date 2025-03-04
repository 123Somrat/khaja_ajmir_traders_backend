import dueModel from "../../../src/models/due/dueSchema";
import dueService from "../../../src/lib/due";
import HttpError from "../../../src/utils/customError";
describe("Single due", () => {
  const demoDue = {
    _id: "5f4f8f2b5f8f3f4f8f2b5f8f",
    sellerName: "Demo Seller",
    sellerContact: "1234567890",
    sellerAddress: "Demo Address",
    dueAmount: 1000,
    expiredDate: "2020-10-10",
    createdAt: "2020-10-10",
    updatedAt: "2020-10-10",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return a single due", async () => {
    dueModel.findById = jest.fn().mockResolvedValue(demoDue);

    const res = await dueService.getSingleDue("5f4f8f2b5f8f3f4f8f2b5f8f");
    expect(res).toEqual(demoDue);
  });

  it("Should return 404 if due not found", async () => {
    dueModel.findById = jest.fn().mockResolvedValue(null);

    expect(dueService.getSingleDue('')).rejects.toThrow(HttpError);
    expect(dueService.getSingleDue('')).rejects.toMatchObject({
        status: 404,
        message: "No data found",
    });
  })
});
