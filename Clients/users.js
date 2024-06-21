/*
The idea behind the clients namespace was to create an easier way to make requests from the tests.
The thinking was the tests would be easier to read, and changes made to the API under test could be
cushioned here and prevent a ripple effect through all tests.

With that said, I would have like to improve this portion of the code but the time I allocated
was not enough. There is room to DRY this code out.
*/
exports.addUser = async function(userToAdd, requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.post('users', {
            data: userToAdd,
            headers: {
                'user-agent': 'playwright-sample',
                'content-type': 'application/json',
                // Auth token or any other needed headers could be set here.
            }
        });
        console.log(`Post ${JSON.stringify(userToAdd)} to ${rawResponse.url()} returned status ${rawResponse.statusText()}`);
        return rawResponse;
    
    }

    throw new Error('requestContext is required.');
};

exports.getAllUsers = async function(requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.get('users', {
            headers: {
                'user-agent': 'playwright-sample',
                'content-type': 'application/json',
                // Auth token or any other needed headers could be set here.
            }
        });

        console.log(`Get ${rawResponse.url()} returned status ${rawResponse.statusText()}`);
        return rawResponse;
    }

    throw new Error('requestContext is required.');
};

exports.updateUser = async function(userUpdate, requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.put(`users/${userUpdate.id}`, {
            data: userUpdate,
            headers: {
                'user-agent': 'playwright-sample',
                'content-type': 'application/json',
                // Auth token or any other needed headers could be set here.
            }
        });

        console.log(`Put ${JSON.stringify(userUpdate)} to ${rawResponse.url()} returned status ${rawResponse.statusText()}`);
        return rawResponse;    
    }

    throw new Error('requestContext is required.');
};

exports.removeUser = async function(userId, requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.delete(`users/${userId}`, {
            headers: {
                'user-agent': 'playwright-sample',
                'content-type': 'application/json',
                // Auth token or any other needed headers could be set here.
            }
        });
        console.log(`Delete ${rawResponse.url()} returned status ${rawResponse.statusText()}`);
        return rawResponse;    
    }

    throw new Error('requestContext is required.');
};

exports.getAllPostsByUser = async function(userId, requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.get(`users/${userId}/posts`, {
            headers: {
                'user-agent': 'playwright-sample',
                'content-type': 'application/json',
                // Auth token or any other needed headers could be set here.
            }
        });
        console.log(`Get ${rawResponse.url()} returned status ${rawResponse.statusText()}`);
        return rawResponse;    
    }

    throw new Error('requestContext is required.');
};