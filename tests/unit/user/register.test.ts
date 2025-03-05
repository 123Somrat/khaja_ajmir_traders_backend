import userModel from "../../../src/models/user/userSchema";
import userService from "../../../src/lib/user";
import HttpError from "../../../src/utils/customError";


describe("Register", () => {
  const mockData = {
    name: "admin",
    email: "admin@gmail.com",
    password: "admin123",
  };

  it("should return user object", async () => {
    userModel.create = jest.fn().mockResolvedValue(mockData);

    const user = await userService.createUser(mockData);
    expect(user).toEqual(mockData);
    console.log("test passed");
  });

  
    it('should return true if user exist', async () => {
        userModel.findOne = jest.fn().mockResolvedValue(mockData);
        const user = await userService.isUserExeist(mockData.email);
        expect(user).toEqual(true);
        console.log('test passed')
    });

    it("should throw an error if user creation fails", async () => {
        userModel.create = jest.fn().mockRejectedValue(new Error("Database Error"));
      
        await expect(userService.createUser(mockData)).rejects.toThrow(new HttpError(500, "Internal server error", "An unexpected error occured"));
      });




});
