import RoleType from '../../lib/types.js';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { accessTokenExpires, accessTokenSecrete, refreshTokenExpires, refreshTokenSecrete } from '../../core/config/config.js';


const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    referenceCode: {
      type: String,
      unique: true, 
      length: 6,
      default: () => {
        let code = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 6; i++) {
          code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return code;
      }
    },
    referedBy: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    area: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0
    },
    role: {
      type: String,
      default: RoleType.USER,
      enum: [RoleType.USER, RoleType.ADMIN, RoleType.SELLER]
    },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    refreshToken: {
      type: String,
      default: ''
    },
    subscription: {
      type: String,
      enum: ['basic', 'standard', 'premium', 'none'],
      default: 'none'
    },
    subscriptionStartDate: { type: Date, default: null },
    subscriptionEndDate: { type: Date, default: null },
    hasActiveSubscription: { type: Boolean, default: false },
    profileImage: { type: String, default: 'https://res.cloudinary.com/demo/image/upload/v1580125616/samples/people/boy-snow-hoodie.jpg' },
  },
  { timestamps: true }
);

// Hashing password
UserSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(this.password, 10);

  this.password = hashedPassword;
  next();
});

// Password comparison method (bcrypt)
UserSchema.methods.comparePassword = async function (id, plainPassword) {
  const { password: hashedPassword } = await User.findById(id).select('password')

  const isMatched = await bcrypt.compare(plainPassword, hashedPassword)

  return isMatched
}

// Generate ACCESS_TOKEN
UserSchema.methods.generateAccessToken = function (payload) {
  return jwt.sign(payload, accessTokenSecrete, { expiresIn: accessTokenExpires });
};

// Generate REFRESH_TOKEN
UserSchema.methods.generateRefreshToken = function (payload) {
  return jwt.sign(payload, refreshTokenSecrete, { expiresIn: refreshTokenExpires });
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
