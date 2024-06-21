/*
The idea behind the clients namespace was to create an easier way to make requests from the tests.
The thinking was the tests would be easier to read, and changes made to the API under test could be
cushioned here and prevent a ripple effect through all tests.

With that said, I would have like to improve this portion of the code but the time I allocated
was not enough. There is room to DRY this code out.
*/
exports.addPost = async function(postToAdd, requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.post('posts', {
            data: postToAdd,
            headers: {
                'user-agent': 'playwright-sample',
                'content-type': 'application/json',
                // Auth token or any other needed headers could be set here.
            }
        });
        console.log(`Post ${JSON.stringify(postToAdd)} to ${rawResponse.url()} returned status ${rawResponse.statusText()}`);
        return rawResponse;
    
    }

    throw new Error('requestContext is required.');
};

exports.getAllPosts = async function(requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.Get(`post`, {
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

exports.updatePost = async function(postToUpdate, requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.put(`posts/${postToUpdate.id}`, {
            data: postToUpdate,
            headers: {
                'user-agent': 'playwright-sample',
                'content-type': 'application/json',
                // Auth token or any other needed headers could be set here.
            }
        });

        console.log(`Put ${JSON.stringify(postToUpdate)} to ${rawResponse.url()} returned status ${rawResponse.statusText()}`);
        return rawResponse;    
    }

    throw new Error('requestContext is required.'); 
};

exports.removePost = async function(postId, requestContext) {
    if (requestContext) {
        const rawResponse = await requestContext.delete(`users/${postId}`, {
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