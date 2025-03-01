// const User = require('../models/user');


// export const signup = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !email || !password) {
//             return res.status(400).json({ msg: 'All fields are required' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//         const newUser = new User({ username, email, password: hashedPassword });

//         await newUser.save();
//         res.status(201).json({ msg: 'User registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Server error' });
//     }
// }

// export const login = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username })
//         if (!user) {
//             return res.status(404).json({ msg: 'User does not exist' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, user: { username: user.username, password: user.password } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// }