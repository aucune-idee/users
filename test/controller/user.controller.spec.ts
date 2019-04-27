import { createUser, getUser }  from "../../app/controllers/user.controller";
import { User } from '../../app/models/user.model';
import {BaseError, ErrorCodes} from '../../app/exceptions/base-error';


jest.mock('../../app/models/user.model');

describe("User controller", () => {     
    describe("Create user", () => {
        it('Empty username to throw validation error', async () => {
            await expect(createUser({email:"", username:""})).rejects.toEqual(
                new BaseError("Username is invalid", ErrorCodes.INVALID_USERNAME)
            );
        });
        it('Empty email to throw validation error', async () => {
            await expect(createUser({email:"", username:"test"})).rejects.toEqual(
                new BaseError("This email is invalid", ErrorCodes.INVALID_EMAIL)
            );
        });
        it('Malformated email to throw validation error', async () => {
            await expect(createUser({email:"testqovbzi", username:"test"})).rejects.toEqual(
                new BaseError("This email is invalid", ErrorCodes.INVALID_EMAIL)
            );
        });

        it('Existing username or email should throw an error', async () => {
            User.findOne = jest.fn().mockImplementation((param)=>{
                return Promise.resolve({
                    username:"toto",
                    email:"toto@email.com"
                });
            });
            await expect(createUser({email:"test@email.com", username:"test"})).rejects.toEqual(
                new BaseError("Username or email already exists", ErrorCodes.EXISTING_ACCOUNT)
            );
        });

        it('When all good, user created', async () => {
            User.findOne = jest.fn().mockImplementation((param)=>{
                return Promise.resolve(null);
            });
            User.create = jest.fn().mockImplementation((param)=>{
                return Promise.resolve({
                    username:"toto",
                    email:"toto@email.com"
                });
            });
            await expect(createUser({email:"test@email.com", username:"test"})).resolves.toEqual({
                username:"toto",
                email:"toto@email.com"
            });
        });
    });
})