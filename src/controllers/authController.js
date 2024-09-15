import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch{
        res.status(500).json({ message: 'Error registering user' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, isAdmin: user.isAdmin }, 'your_secret_key',
            { expiresIn: '1h' }
        );
        res.status(200).json({message: 'login successfull yay', token})
    } catch (err) {
        res.status(500).json({message: 'login error lol'})
    };
}