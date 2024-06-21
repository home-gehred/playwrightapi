const { test, expect } = require('@playwright/test');
const userClient = require('../Clients/users.js');
const postClient = require('../Clients/posts.js');

test.describe('JSONPlaceholder', () => {
    test.describe('Post_Resource', () => {
        
        let allUsers = undefined;
        let allPostsForTestUser = undefined;

        test.beforeEach('Post test setup', async ({request}) => {
            const allUsersResponse = await userClient.getAllUsers(request);
            expect(allUsersResponse.ok()).toBeTruthy();
            allUsers = await allUsersResponse.json();
        });

        test('Given valid post when adding post then returns expected response', async ({request}) => {
            let userForPostTest = undefined;
            
            await test.step('select user to associate a post to', async () => {
                // At first I thought this would be easy, but then I started to think about running
                // these tests in parallel. I would use test.beforeEach to create the user, then use
                // the new user for the rest of this test. That would ensure the test would stay
                // in it's own lane, and could be run in parallel with other tests.
                userForPostTest = allUsers.find( user => user.id === 4);
            });

            await test.step(`Create a post associated to ${userForPostTest.name}`, async () => {
                const postToAdd = {
                    "userId": userForPostTest.id,
                    "title": "post title",
                    "body": "post body"
                };

                const rawResponse = await postClient.addPost(postToAdd, request);
                expect(rawResponse.ok()).toBeTruthy();

                const addedPost = await rawResponse.json();
                expect(addedPost.userId).toBe(postToAdd.userId);
                expect(addedPost.title).toBe(postToAdd.title);
                expect(addedPost.body).toBe(postToAdd.body);
                // Verify the response has returned an id property
                expect(addedPost).toHaveProperty("id"); // <== In a case of an api that persisted data
                                                        // I would add another step to use the UI to look it up   
            });
        });

        test('Given existing post when modifing post content then returns expected response', async ({request}) => {
            let userForPostTest = undefined;
            let postForTest = undefined;
            
            await test.step('select user to associate a post to', async () => {
                userForPostTest = allUsers.find( user => user.id === 5);
            });
            
            await test.step(`Get all posts for ${userForPostTest.name}`, async () => {
                const allPostByUserResponse = await userClient.getAllPostsByUser(userForPostTest.id, request);
                expect(allPostByUserResponse.ok()).toBeTruthy();

                allPostsForTestUser = await allPostByUserResponse.json();
            });

            await test.step(`Get existing post for ${userForPostTest.name}`, async () => {
                postForTest = allPostsForTestUser.find(post => post.id = 3);
            });

            await test.step(`Update post with id:${postForTest.Id}`, async () => {
                const expectedPost = {...postForTest,body:'updated body'};
                const updatePostResponse = await postClient.updatePost(expectedPost, request);

                expect(updatePostResponse.ok()).toBeTruthy();

                const updatedPost = await updatePostResponse.json();

                expect(updatedPost).toHaveProperty('userId', expectedPost.userId);
                expect(updatedPost).toHaveProperty('id', expectedPost.id);
                expect(updatedPost).toHaveProperty('title', expectedPost.title);
                expect(updatedPost).toHaveProperty('body', expectedPost.body);

                // In API that persisted data I would add another step to verify.
            });
        });

        test('Given existing post when removing post content then returns expected response', async ({request}) => {
            let userForPostTest = undefined;
            let allPostsForTestUser = undefined;
            let postForTest = undefined;
            
            await test.step('select user to associate a post to', async () => {
                userForPostTest = allUsers.find( user => user.id === 5);
            });
            
            await test.step(`Get all posts for ${userForPostTest.name}`, async () => {
                const allPostByUserResponse = await userClient.getAllPostsByUser(userForPostTest.id, request);
                expect(allPostByUserResponse.ok()).toBeTruthy();

                allPostsForTestUser = await allPostByUserResponse.json();
            });

            await test.step(`Get existing post for ${userForPostTest.name}`, async () => {
                postForTest = allPostsForTestUser.find(post => post.id = 3);
            });

            await test.step(`delete post with id:${postForTest.Id}`, async () => {
                const removedPostResponse = await postClient.removePost(postForTest.Id, request);

                expect(removedPostResponse.ok()).toBeTruthy();
                
                // In API that persisted data I would add another step to verify.
            });
        });
    });
});