const { test, expect } = require('@playwright/test');
const users = require('../Clients/users.js');

test.describe('JSONPlaceholder', () => {
    test.describe('User_Resource', () => {
        test('Given valid user information when adding user then returns expected response', async ({request}) => {
            // Arrange            
            const userToAdd = {
                "name": "Billy Baroo",
                "username": "Billy.Baroo",
                "email": "Billy.Baroo@nm.com",
                "phone": "414-648-3804"
            };

            // Act
            const rawResponse = await users.addUser(userToAdd, request);

            // Assert
            expect(rawResponse.ok()).toBeTruthy();

            const addUser = await rawResponse.json();
            expect(addUser.name).toBe(userToAdd.name);
            expect(addUser.username).toBe(userToAdd.username);
            expect(addUser.email).toBe(userToAdd.email);
            expect(addUser.phone).toBe(userToAdd.phone);
            // Verify the response has returned an id property
            expect(addUser).toHaveProperty("id", 11);// <== the 11 here is an assumption

            // Typically, I would break this up in steps like the next test so
            // that we can verify changes were persisted
        });

        test('Given an already entered user when updating email then returns expected response', async({request}) => {
            let allUsers = undefined;
            let userToModify = undefined;
            
            await test.step('Get list of all users', async () => {
                const allUsersResponse = await users.getAllUsers(request);
                expect(allUsersResponse.ok()).toBeTruthy();

                allUsers = await allUsersResponse.json();
            });
           
            await test.step('Get user for update of email', async () => {
                userToModify = allUsers.find(users => users.id === 5);
                expect(userToModify).toHaveProperty("id", 5);
            });

            await test.step('Update users email', async () => {
                userToModify.email = 'bob.gehred@nm.com';
                const updateUserResponse = await users.updateUser(userToModify, request);
                expect(updateUserResponse.ok()).toBeTruthy();
                const updatedUser = await updateUserResponse.json();

                expect(updatedUser).toHaveProperty("id", userToModify.id);
                expect(updatedUser).toHaveProperty("email", userToModify.email);
            });

            await test.step('verify update is persisted to data', async () => {
                // Against a 'real' api I would make a point to call another endpoint
                // that would do a round trip to data store to be sure data was persisted.
            });

            // From what I have read there are two approaches to testing api's.
            // One approach is to break each property into it's own test
            // the other approach is to test the whole payload. Each has advantages and disadvantages
            // When testing each property, when a test fails you generally know more accurately what is
            // wrong. A disadvantage is that you have many more tests, consequently more to maintain.
            // When testing the whole payload, when a test fails it is more ambigous as to what is wrong.
            // An advantage is that you have less tests to run.
            // In my opinion, I tend to favor testing the whole payload to reduce the number of tests,
            // in that way I like crafting tests that cover the '80%' scenario where this is what the api
            // does 80% of the time.
        });

        test('Given an existing user when deleting a user then returns ok', async ({request}) => {
            let allUsers = undefined;
            let userToRemove = undefined;
            
            await test.step('Get list of all users', async () => {
                const allUsersResponse = await users.getAllUsers(request);
                expect(allUsersResponse.ok()).toBeTruthy();

                allUsers = await allUsersResponse.json();
            });
           
            await test.step('Get user for update of email', async () => {
                userToRemove = allUsers.find(users => users.id === 7);
                expect(userToRemove).toHaveProperty("id", 7);
            });

            await test.step('remove the users', async () => {
                const updateUserResponse = await users.removeUser(userToRemove.id, request);
                expect(updateUserResponse.ok()).toBeTruthy();
            });

            await test.step('verify user is removed', async () => {
                // Against a 'real' api I would make a point to call another endpoint
                // that would do a round trip to data store to be sure data was really removed.
            });
         
        });
    });
});