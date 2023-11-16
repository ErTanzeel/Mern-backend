
const { loominateUser, PostWithUsername } = require("../Model/model")


const handleUploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { filename } = req.file
        const { receivedLoginData, about } = req.body


        const updatedDocument = await loominateUser.findOneAndUpdate({ name: receivedLoginData }, { image: filename }, { new: true });
        console.log(updatedDocument);

        res.json({ message: 'File uploaded successfully' });

    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const handleModalData = async (req, res) => {
    try {
        console.log('Received Body:', req.body);

        const modalInputDataJSON = JSON.parse(req.body.modalinputdata);
        const receivedLoginData = req.body.receivedLoginData;

        // Now you can access the data
        console.log('Received Modal Input Data:', modalInputDataJSON);
        console.log('Received Login Data:', receivedLoginData);

        const updateUser = await loominateUser.findOneAndUpdate(
            { name: receivedLoginData },
            { name: modalInputDataJSON.name, about: modalInputDataJSON.textarea },
            { new: true }
        );

        res.json(updateUser)
        // res.json({ message: 'Data received successfully' });
    } catch (error) {
        console.error('Error handling modal data:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};



async function handlepostModal(req, res) {

    try {

        console.log('Received Body:', req.body);
        const { postData, userName } = req.body

        let backendPostData = await loominateUser.findOneAndUpdate({ name: userName }, { $push: { postData: postData } }, { new: true })
        // console.log('backendpostData', backendPostData);
        res.json(backendPostData)



        // res.json({ message: ' api connection successfully ' })
    } catch (error) {
        res.json('Did not connected', error)
    }


}


const handleGetFile = async (req, res) => {
    try {
        // Extract the name parameter from the query string
        const { receivedLoginData } = req.body
        console.log('my receivedLoginData', receivedLoginData);

        if (!receivedLoginData) {
            return res.status(400).json({ error: 'Name parameter is missing in the query' });
        }

        const userData = await loominateUser.findOne({ receivedLoginData });
        console.log('my userData ', userData);

        if (userData) {
            // Extract only the fields you want to send in the response
            const responseData = {
                name: userData.name,
                email: userData.email,
                // Add other fields you want to include
            };
            console.log(responseData);
            res.json(responseData);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

// Define a route for the GET method


async function handleSignup(req, res) {
    // Create a new user document using the loominateUser.create method
    try {
        const { name, email, password, about, postData } = req.body;
        console.log('file', req.file);
        const image = req.file ? req.file.filename : ''; // Get the filename from Multer
        // const about = req.body ? req.file.filename : ''; // Get the filename from Multer

        console.log(email);
        console.log(name);
        let data = await loominateUser.create({
            name,
            email,
            password,
            image,
            about,
            postData,

        });
        // Respond with a success message
        return res.status(201).json({ message: 'User registered successfully' });

    }
    catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }


}

async function handleLogin(req, res) {
    const { name, password } = req.body;

    const user = await loominateUser.findOne({ name, password });
    if (!user) {

        return res.status(500).json({ message: 'User not find ' });
    }
    else {
        return res.json(user)

    }

}

async function handleFetchData(req, res) {
    try {
        const items = await loominateUser.find();
        console.log('my items', items);
        const image = req.file ? req.file.filename : ''; // Get the filename from Multer
        console.log('mtfetch image', image);

        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

}
async function handleFeed(req, res) {
    try {
        const users = await loominateUser.find({}, 'name postData image').populate('postData');
        console.log('users', users);
        const image = req.file ? req.file.filename : '';

        const postsWithUsernames = users.map((user) => {
            return {
                username: user.name,
                image: user.image, // Assuming user has an 'image' field
                posts: user.postData.map((post) => {
                    console.log('content', post);
                    if (!post) {
                        throw new Error('Post content is required');
                    }
                    return {
                        content: post,
                        image: image, // Add the image here if needed
                        // Add other post-related fields if needed
                    };
                })
            };
        });

        // Save the data to the new schema and respond with it
        let postsWithUsernamesAndImages = await PostWithUsername.create(postsWithUsernames);
        console.log('postsWithUsernamesAndImages', postsWithUsernamesAndImages);
        res.json(postsWithUsernamesAndImages);
    } catch (error) {
        console.error('Error fetching posts with usernames:', error);
        res.status(500).json({ error: 'An error occurred', message: error.message });
    }
}




module.exports = {
    handleSignup, handleLogin, handleFetchData,
    handleUploadFile, handleGetFile, handleModalData, handlepostModal, handleFeed
}