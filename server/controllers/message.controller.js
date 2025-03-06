export const getUsersForSideBar = async(req, res) => {
    try {
        const loggedInUserId = res.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (err){
        console.error("Error in getUsersForSideBar:", err.msg);
        res.status(500).json({msg: 'Internal Server Error'});

    }
}