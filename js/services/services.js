    // post to server
    const postData = async (url, data) => { // async code
        const res = await fetch(url, { // wait for async code
            method: "POST", // fetch - using instead of XMLHttpRequest
            headers: {
                'Content-type': 'application/json'
            },
            body: data // info, that we send
        });

        return await res.json(); // parses JSON response into native JavaScript objects
    };

    // get from server
    const getResource = async (url) => { // async code
        const res = await fetch(url);

        if (!res.ok) {
            throw prompt(new Error(`Could not fetch ${url}, status: ${res.status}`));
        }

        return await res.json(); // parses JSON response into native JavaScript objects
    };

//npx json-server --watch db.json

    export {postData};
    export {getResource};